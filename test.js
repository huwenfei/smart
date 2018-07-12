var adminDao = require('./dao/admin/customer');
var redis = require('./service/admin/redis');
console.log(redis);
var customer = {
    phone: '15313085070',
    subject: '2',
    detail: '大数据是如何支持人工智能的',
    pv: 2,
    visitdate: '20180711',
    city: '潍坊',
    gender: '1',
    age: 31
};
async function bar() {
    var result = await adminDao.queryCustomerByPhone('15313085070').catch(((err) => {
        return err;
    }));
    console.log('result=========',result);
    if (result.code!=0) {//用户存在---直接插入记录
        var customerId = result[0].id;
        var record = {
            subject: '2',
            detail: '大数据是如何支持人工智能的',
            pv: 2,
            visitdate: '20180711',
            customerId:customerId
        };
        var result = await adminDao.addRecord(record).catch((err) => {
            return err;
        });
        if(result.code!==0){
            return {code:1,msg:'数据入库成功'}
        }else{
            return result;
        }
    }else{
        return result;
    }
}
bar();
// async function foo() {
//     // var result = await redis.connect().then(client => client.set('15313085070', '123'));
//     var memPhone = await redis.get('15313085070');
//     console.log(memPhone);
// }
// foo();