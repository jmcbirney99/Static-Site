const fs = require('fs-extra');
const path = require('path');
const marked = require('marked');
const yaml = require('js-yaml');

// Function to read template
async function readTemplate(templateName) {
    return await fs.readFile(path.join(__dirname, 'src', 'templates', templateName), 'utf8');
}

// Function to process markdown file
async function processMarkdown(filePath, template) {
    const markdown = await fs.readFile(filePath, 'utf8');
    const content = marked.parse(markdown);
    const title = markdown.split('\n')[0].replace('# ', '');
    
    return template
        .replace('{{title}}', title)
        .replace('{{content}}', content);
}

// Function to process blog posts
async function processBlogPost(filePath, template) {
    const markdown = await fs.readFile(filePath, 'utf8');
    const [frontMatter, ...contentParts] = markdown.split('---\n');
    const metadata = yaml.load(frontMatter);
    const content = marked.parse(contentParts.join('---\n'));
    
    return template
        .replace('{{title}}', metadata.title)
        .replace('{{date}}', metadata.date)
        .replace('{{content}}', content);
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
    
    // Process markdown pages
    const pages = ['index', 'about', 'contact'];
    for (const page of pages) {
        const html = await processMarkdown(
            `src/pages/${page}.md`,
            mainTemplate
        );
        await fs.outputFile(`public/${page}.html`, html);
    }
    
    // Process blog posts
    const blogTemplate = await readTemplate('blog-post.html');
    const blogPosts = await fs.readdir('src/pages/blog');
    
    for (const post of blogPosts) {
        if (post.endsWith('.md')) {
            const html = await processBlogPost(
                `src/pages/blog/${post}`,
                blogTemplate
            );
            const outputPath = `public/blog/${post.replace('.md', '.html')}`;
            await fs.outputFile(outputPath, html);
        }
    }
}

build().catch(console.error); 