const http = require('http');
const admin = require('./modules/admin');
const User = require('./modules/user');
const Route = require('./modules/routing');
const port = 5002;

http.createServer((req,res)=>{
    Route.get([req, res], "/admin/getAllUsers", admin);
    Route.post([req, res], "/user/getUser", User);
}).listen(port);

console.log(`Server is running on port ${port}`);