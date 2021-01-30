const http = require('http');
const fs = require('fs');
const port = 5002;
const path = __dirname+"/public/";

http.createServer((req, res) => {
    const url = req.url.split('/');
    url.shift();
    const method = req.method;
    if (method === "GET") {
        switch (url[0]){
            case "":
                fs.readFile(path+'index.html', 'utf-8', (err, data) => {
                    res.writeHead(200, {"content-type": "text/html"});
                    res.write(data);
                    res.end();
                });
                break;
            case "require":
                fs.readFile(`${path}/${url[1]}`,(err,data)=>{
                    res.write(data);
                    res.end();
                });
        }
    }
}).listen(port);

console.log(`Server is running on port ${port}`);