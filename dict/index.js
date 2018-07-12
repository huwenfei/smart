var redis = require('redis');
var node_xlsx = require('node-xlsx');
var path = require('path');
module.exports = {
    phonePres: [],
    getPhonePres: function () {
        if (this.phonePres.length) {
            return this.phonePres;
        } else {
            var obj = node_xlsx.parse(path.join(__dirname,'/dx_all.csv'));
            var excelObj = obj[0].data;//取得第一个excel表的数据
            //循环遍历表每一行的数据，从第二行开始
            for (var i = 1; i < excelObj.length; i++) {
                if(excelObj[i].length){
                    this.phonePres.push(excelObj[i][0]);//号段
                }else{
                    continue;
                }
                          
            }
            return this.phonePres;
        }
        // var redis = require('redis'),
        //     RDS_PORT = 6379,        //端口号
        //     RDS_HOST = '127.0.1.1',    //服务器IP
        //     RDS_PWD = 'datang',
        //     RDS_OPTS = { auth_pass: RDS_PWD },            //设置项
        //     client = redis.createClient(RDS_PORT, RDS_HOST, RDS_OPTS);
        // client.on('ready', function (res) {
        //     //读取字典文件
        //     var obj = node_xlsx.parse(__dirname+'/dx_all.csv');
        //     var excelObj = obj[0].data;//取得第一个excel表的数据
        //     //循环遍历表每一行的数据，从第二行开始
        //     for (var i = 1; i < excelObj.length; i++) {
        //         var phonePre = excelObj[i][0];//号段
        //         for(var j = 0;j<10000;j++){
        //             var phone = phonePre+formatNum(j);
        //             client.set(md5(phone),phone);
        //         }
        //     }
        //     client.quit();
        // });
    }
}
