const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // Normalize the URL to prevent directory traversal
    let filePath = path.normalize(req.url);
    
    // Default to index.html for root path
    if (filePath === '/' || filePath === '\\') {
        filePath = '/index.html';
    }
    
    // Add .html extension if not a resource file and doesn't already end in .html
    if (!path.extname(filePath) && !filePath.match(/\.(css|js|png|jpg|jpeg|gif|svg)$/)) {
        filePath += '.html';
    }

    // Get the full path from the public directory
    const fullPath = path.join(process.cwd(), 'public', filePath);

    // Read file
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            console.error(`Error reading file ${fullPath}:`, err);
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }

        // Set content type based on file extension
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript',
            '.png': 'image/png',
            '.jpg': 'image/jpeg',
            '.jpeg': 'image/jpeg',
            '.gif': 'image/gif',
            '.svg': 'image/svg+xml'
        }[ext] || 'text/plain';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
}); 