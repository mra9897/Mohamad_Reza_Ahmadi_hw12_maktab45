const http = require('http');
const fs = require('fs');
const port = 5002;
http.createServer((req,res)=>{
    if(req.url === "/"){
        res.writeHead(200, {"content-type":"text/html"});
        res.write("<h1>Hello World</h1>");
    }
    else if(req.url == "/data"){
        res.writeHead(200, {"content-type":"application/json"});
        res.write(fs.readFileSync(__dirname+'/data/users.json','utf-8'));
    }
    res.end();
}).listen(port);

console.log(`Server is running on port ${port}`);