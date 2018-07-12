
var connection = require('../connection').connection;

module.exports = {
    //用户新增
    addUser: function (user) {
        return new Promise(function (res, rej) {
            // connection.connect();
            connection.query('INSERT INTO USERS (USERNAME,PASSWORD,PHONE) VALUE("' + user.username + '","' + user.password + '","' + user.phone + '")', function (err, results, feilds) {
                if (err) {
                    rej({ code: 0, msg: '数据库操作错误' })
                } else {
                    res({ code: 1, msg: '新增用户成功' })
                }
            });
            // connection.end();
        });
    },
    //使用用户名查询用户
    queryUserByUsername: function (username) {
        return new Promise(function (res, rej) {
            // connection.connect();
            connection.query('SELECT USERNAME,PASSWORD,PHONE FROM USERS WHERE USERNAME="' + username + '"', function (err, results, feilds) {
                if (err) {
                    rej({ code: 0, msg: '查询用户信息失败' });
                } else {
                    res(results);
                }
            });
            // connection.end();
        });
    },
    //使用用户名查询用户
    queryUserByPhone: function (phone) {
        return new Promise(function (res, rej) {
            // connection.connect();
            connection.query('SELECT USERNAME,PHONE FROM USERS WHERE PHONE="' + phone + '"', function (err, results, feilds) {
                if (err) {
                    rej({ code: 0, msg: '查询用户信息失败' })
                } else {
                    res(results);
                }
            });
            // connection.end();
        });
    }
}