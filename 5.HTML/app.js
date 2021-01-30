const http = require('http');
const fs = require('fs');
const port = 5002;
http.createServer((req, res) => {

    res.writeHead(200, { "content-type": "text/html" });
    res.write(fs.readFileSync(__dirname + '/index.html', 'utf-8'));
    res.end();
}).listen(port);

console.log(`Server is running on port ${port}`);