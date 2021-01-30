const fs = require('fs');

const getAllUsers = () => {
    return fs.readFileSync(__dirname+'/../data/users.json', 'utf-8');
}

module.exports = {getAllUsers};