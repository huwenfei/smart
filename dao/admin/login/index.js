
var connection = require('../../connection').connection;

module.exports = {
   
    //根据名称查询管理员
    queryUserByName:function (name) {
            // connection.connect();
            var sql = 'SELECT NAME,PASSWORD,PHONE FROM ADMINS WHERE NAME="' + name + '"';
            return new Promise((res,rej)=>{
                connection.query(sql, function (err, results, feilds) {
                    if (err) {
                        rej({ code: 0, msg: '查询用户信息失败' });
                    } else {
                        res(results);
                    }
                });
            })
    }
}