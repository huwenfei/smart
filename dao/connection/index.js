var mysql = require('mysql');
var connection = mysql.createPool({
    host:'123.58.241.145',
    user:'root',
    password:'369xinda',
    database:'smart'
});

module.exports = {
    connection
}