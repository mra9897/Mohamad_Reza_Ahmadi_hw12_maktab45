const fs = require('fs');

const getUser = body => {
    let id = body.id;
    let users = JSON.parse(fs.readFileSync(__dirname+"/../data/users.json", "utf-8"));
    let user = users.find(v=>parseInt(v.id) === parseInt(id));
    return user ? JSON.stringify(user) : JSON.stringify({"result":"user not found"});
}

module.exports = {getUser};