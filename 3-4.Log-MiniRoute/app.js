const http = require('http');
const fs = require('fs');
const port = 5002;
http.createServer((req,res)=>{
    res.writeHead(200, {"content-type":"text/html"});
    switch(req.url){
        case "/":
            res.write("<h3>Hello Web Application</h3>");
            break;
        case "/about":
            res.write("<h3>About Me</h3>");
            console.log(req.url);
            break;
        case "/contact-us":
            res.write("<h3>Contact Us</h3>");
            break;
        case "/blog":
            res.write("<h3>Blog</h3>");
            break;
        case "/login":
            res.write("<h3>login</h3>");
            break;
        default:
            res.write("<h3 style='color: darkred'>404 - Page not found</h3>");
    }
    res.end();
}).listen(port);

console.log(`Server is running on port ${port}`);