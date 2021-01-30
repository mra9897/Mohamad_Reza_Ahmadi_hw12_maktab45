const http = require('http');
const fs = require('fs');
const port = 5002;
const path = __dirname + "/";

http.createServer((req, res) => {
    const url = req.url.split('/');
    url.shift();
    const method = req.method;
    switch (url[0]) {
        case "":
            fs.readFile(path + 'public/index.html', 'utf-8', (err, data) => {
                res.writeHead(200, {"content-type": "text/html"});
                res.write(data);
                res.end();
            });
            break;
        case "require":
            fs.readFile(`${path}public/${url[1]}`, (err, data) => {
                res.write(data);
                res.end();
            });
            break;
        case "login":
            let body = '';
            req.on('data', chunk => {
                body += chunk.toString();
            });
            req.on('end', () => {
                body = body ? JSON.parse(body) : null;
                console.log(body);
                fs.readFile(path + "data/users.json", "utf-8", ((err, data) => {
                    if(err) return console.log(err.message);
                    const db = JSON.parse(data);
                    const user = db.find(v => v.username === body.username && v.password === body.password);
                    if (user !== undefined)
                        res.write(JSON.stringify({'result': 1}));
                    else
                        res.write(JSON.stringify({'result': 0}));
                    res.end();
                }));
                // const db = JSON.parse(fs.readFileSync(path + "data/user.json", "utf-8"));
                // if (db.includes(v => v.username === body.username && v.password === body.password))
                //     res.write({'result': 1});
                // else
                //     res.write({'result': 0});
                // res.end();
            });
            break;
    }
}).listen(port);

console.log(`Server is running on port ${port}`);