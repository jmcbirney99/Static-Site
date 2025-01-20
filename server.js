const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = req.url === '/' ? '/index.html' : req.url;
    
    // Add .html extension if not a resource file and doesn't already end in .html
    if (!path.extname(filePath) || (!filePath.endsWith('.html') && !filePath.match(/\.(css|js)$/))) {
        filePath += '.html';
    }

    // Get the full path
    const fullPath = path.join(__dirname, 'public', filePath);

    // Read file
    fs.readFile(fullPath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('404 Not Found');
            return;
        }

        // Set content type based on file extension
        const ext = path.extname(filePath);
        const contentType = {
            '.html': 'text/html',
            '.css': 'text/css',
            '.js': 'application/javascript'
        }[ext] || 'text/plain';

        res.writeHead(200, { 'Content-Type': contentType });
        res.end(data);
    });
});

server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
}); 