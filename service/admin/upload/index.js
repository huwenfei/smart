
var path = require('path');
var fs = require('fs');
var formidable = require('formidable');
var node_xlsx = require('node-xlsx');
var md5 = require('md5');
var getPhone = require('./getPhone');
var phonePres = require(path.join(__dirname, '../../../dict')).getPhonePres();
var redis = require('../redis');
var customerDao = require(path.join(__dirname, '../../../dao/admin/customer'));
module.exports = {
    upload: function (req) {
        return new Promise((res, rej) => {
            /**
        * 处理文件
        */
            var form = new formidable.IncomingForm();
            form.encoding = 'utf-8';
            form.uploadDir = path.join(__dirname, '../../../static/adminUpload/');
            form.keepExtensions = true;//保留后缀
            form.maxFieldsSize = 2 * 1024 * 1024;
            form.parse(req, function (err, fields, files) {
                if (err) {

                    rej({ code: 0, msg: '文件上传错误！' });
                }
                //   console.log(fields,files.file.name);
                var filename = files.file.name;

                // 对文件名进行处理，以应对上传同名文件的情况
                var nameArray = filename.split('.');
                var date = new Date();

                var newName = nameArray[0] + '_' + date.getTime() + '.' + nameArray[1]
                var newPath = form.uploadDir + newName;
                fs.renameSync(files.file.path, newPath);  //重命名

                res(ExcelParse(newPath));

            })
        });

    }
}
var genderMap = { '女': 0, '男': 1 };
async function ExcelParse(path) {
    var results = [];
    var obj = node_xlsx.parse(path);
    var excelObj = obj[0].data;//取得第一个excel表的数据
    var num = 0;
    for (var i = 0; i < excelObj.length; i++) {
        //先去redis中查询，如果查不到，再去暴力破解
        var memPhone = await redis.get(excelObj[i][0]);
        console.log('memPhone=========', memPhone);
        var phone;
        if (!memPhone) {
            //暴力破解
            phone = await getPhone(excelObj[i][0]);
        } else {
            phone = memPhone;
        }
        /**
         * 字段信息转换
         */
        var customer = {
            phone: phone,
            city: excelObj[i][5],
            gender: genderMap[excelObj[i][6]],
            age: excelObj[i][7],
            secret: excelObj[i][0]
        };
        var subject = -1;
        if (excelObj[i][1].indexOf('前端') > -1 || excelObj[i][1].indexOf('H5') > -1) {
            subject = 0;
        } else if (excelObj[i][1].indexOf('JAVA') > -1) {
            subject = 1;
        } else if (excelObj[i][1].indexOf('大数据') > -1) {
            subject = 2;
        }
        var record = {
            subject: subject,
            detail: excelObj[i][2],
            pv: excelObj[i][3],
            visitdate: excelObj[i][4]
        }
        var result = await saveCustomer(customer, record);
        console.log('result=========', result);
        results.push(result);
    }
    return results;
}
async function saveCustomer(customer, record) {
    var result = await customerDao.queryCustomerByPhone(customer.phone).catch(((err) => {
        return err;
    }));
    if (result && result.length == 1) {//用户存在---直接插入记录
        var customerId = result[0].id;
        record.customerId = customerId;
        return saveRecord(record);
    } else if (result.length == 0) {//没有用户数据 
        //插入用户记录，并获取id
        var result = await customerDao.addCustomer(customer).catch(err => err);
        if (result.code != 0) {//插入成功
            var customers = await customerDao.queryCustomerByPhone(customer.phone).catch(err => err);
            if (customers.length == 1) {
                var customerId = customers[0].id;
                record.customerId = customerId;
                return saveRecord(record);
            } else {//流程出错了，理论上是不会走这里的
                return customers;
            }
        } else {//客户数据插入出错
            return result;
        }
    } else {//查询出错
        return result;
    }
}

async function saveRecord(record) {
    //这里入库之前应该先查询下是否已存在记录
    var exist = await customerDao.queryRecordBySubAndCid(record).catch(err => err);
    if (exist.length === 0) {//不存在
        var result = await customerDao.addRecord(record).catch(err => err);
        if (result.code !== 0) {
            return { code: 1, msg: 'record数据入库成功' }
        } else {//系统异常
            return result;
        }
    } else {//查询异常或已存在
        if(exist.length==1){//已存在则返回提示信息
            return {code:2,msg:'记录已存在'}
        }else{//系统异常
            return exist;
        }
        
    }
}