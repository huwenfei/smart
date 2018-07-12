
var connection = require('../../connection').connection;

module.exports = {
    //根据手机号查询客户信息
   queryCustomerByPhone:function(phone){
        var sql = `SELECT * FROM CUSTOMER WHERE PHONE="${phone}"`;
        console.log(sql);
        return new Promise((res,rej)=>{
            connection.query(sql, function (err, results, feilds) {
                if (err) {
                    rej({ code: 0, msg: '客户查询失败！' });
                } else {
                    res(results);
                }
            });
        })
   },
    //新增客户
    addCustomer:function (customer) {
            // connection.connect();
            var sql = `INSERT INTO CUSTOMER(PHONE,CITY,GENDER,AGE,SECRET) VALUES("${customer.phone}","${customer.city}",${customer.gender},"${customer.age}","${customer.secret}")`;
            console.log(sql);
            return new Promise((res,rej)=>{
                connection.query(sql, function (err, results, feilds) {
                    if (err) {
                        rej({ code: 0, msg: '客户新增失败！' });
                    } else {
                        res(results);
                    }
                });
            })
    },
    //根据主题与客户id查询记录信息
   queryRecordBySubAndCid:function(record){
    var sql = `SELECT * FROM RECORDS WHERE SUBJECT=${record.subject} AND CUSTOMERID=${record.customerId}`;
    console.log(sql);
    return new Promise((res,rej)=>{
        connection.query(sql, function (err, results, feilds) {
            if (err) {
                rej({ code: 0, msg: '记录查询失败！' });
            } else {
                res(results);
            }
        });
    })
},
    addRecord:function (record) {
        // connection.connect();
        var sql = `INSERT INTO RECORDS(SUBJECT,DETAIL,PV,VISITDATE,CUSTOMERID) VALUES("${record.subject}","${record.detail}",${record.pv},"${record.visitdate}",${record.customerId})`;
        console.log(sql);
        return new Promise((res,rej)=>{
            connection.query(sql, function (err, results, feilds) {
                if (err) {
                    rej({ code: 0, msg: '客户记录失败！' });
                } else {
                    res(results);
                }
            });
        })
}
}