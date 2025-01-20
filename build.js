const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const yaml = require('js-yaml');

// Function to read template
async function readTemplate(templateName) {
    return await fs.readFile(path.join(__dirname, 'src', 'templates', templateName), 'utf8');
}

// Function to process markdown file
async function processMarkdown(filePath, template, options = {}) {
    try {
        const markdown = await fs.readFile(filePath, 'utf8');
        console.log(`Processing ${filePath}...`);
        const content = marked.parse(markdown);
        const title = markdown.split('\n')[0].replace('# ', '');
        
        let html = template
            .replace('{{title}}', title)
            .replace('{{content}}', content);
            
        // Handle active states in navigation
        const page = options.page || '';
        html = html
            .replace(`{{#is_${page}}}active{{/is_${page}}}`, 'active')
            .replace(/{{#is_\w+}}active{{\/is_\w+}}/g, '');
        
        return html;
    } catch (error) {
        console.error(`Error processing ${filePath}:`, error);
        throw error;
    }
}

// Function to process blog posts
async function processBlogPost(filePath, template) {
    try {
        const markdown = await fs.readFile(filePath, 'utf8');
        const parts = markdown.split('---\n');
        
        // Ensure we have valid front matter
        if (parts.length < 3) {
            console.warn(`Warning: Invalid front matter in ${filePath}, skipping file`);
            return null;
        }
        
        const metadata = yaml.load(parts[1]); // Load the content between the first two '---'
        const content = marked.parse(parts.slice(2).join('---\n')); // Join the rest as content
        
        if (!metadata || !metadata.title || !metadata.date) {
            console.warn(`Warning: Missing required front matter (title or date) in ${filePath}, skipping file`);
            return null;
        }
        
        let html = template
            .replace('{{title}}', metadata.title)
            .replace('{{date}}', metadata.date)
            .replace('{{content}}', content);
            
        // Handle active states in navigation
        html = html
            .replace('{{#is_blog}}active{{/is_blog}}', 'active')
            .replace(/{{#is_\w+}}active{{\/is_\w+}}/g, '');
        
        return html;
    } catch (error) {
        console.warn(`Warning: Error processing ${filePath}: ${error.message}`);
        return null;
    }
}

// Main build function
async function build() {
    // Create public directory
    await fs.ensureDir('public');
    
    // Copy static assets
    await fs.copy('src/styles', 'public/styles');
    await fs.copy('src/scripts', 'public/scripts');
    
    // Read main template
    const mainTemplate = await readTemplate('main.html');
    
    // Process regular pages
    const pages = ['index', 'about', 'contact', 'blog', 'how-it-works'];
    for (const page of pages) {
        const html = await processMarkdown(
            `src/pages/${page}.md`,
            mainTemplate,
            { [`is_${page === 'index' ? 'home' : page}`]: true }
        );
        if (page === 'blog') {
            // Write blog.md output to /blog/index.html
            await fs.outputFile('public/blog/index.html', html);
        } else {
            await fs.outputFile(`public/${page}.html`, html);
        }
    }
    
    // Process blog posts
    const blogTemplate = await readTemplate('blog-post.html');
    const blogPosts = await fs.readdir('src/pages/blog');
    
    // Create blog directory
    await fs.ensureDir('public/blog');
    
    // Process each blog post
    for (const post of blogPosts) {
        if (post.endsWith('.md')) {
            const postName = post.replace('.md', '');
            const html = await processBlogPost(
                `src/pages/blog/${post}`,
                mainTemplate
            );
            if (html) {
                await fs.outputFile(`public/blog/${postName}.html`, html);
            }
        }
    }
}

build().catch(console.error); 