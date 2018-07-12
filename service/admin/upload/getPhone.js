
var path = require('path');
var redis = require('../redis');
var phonePres = require(path.join(__dirname, '../../../dict')).getPhonePres();
module.exports = function (sPhone) {
    console.log('开始查找手机号：=====',sPhone);
    return new Promise(function (res, rej) {
        var childProcess = require('child_process');
        //cpu减一个吧，要不电脑太卡
        var numCPUs = require('os').cpus().length-1;
        //计算每个子进程需要处理的号码段个数
        var split = Math.floor(phonePres.length / numCPUs);
        var remainder = phonePres.length % numCPUs;
        var children = [];
        var preEnd = 0;
        for (var i = 0; i < numCPUs; i++) {
            var child = childProcess.fork(__dirname + '/getPhoneChild.js');
            children.push(child);
            var tempEnd = split * (i + 1) + (i < remainder ? (i + 1) : remainder);
            child.send({ list: phonePres.slice(preEnd, tempEnd), sPhone });
            preEnd = tempEnd;
            child.on('message', function (phone) {
                if (phone) {
                    //将查询结果放到redis中，方便后续的快速查询
                    redis.connect().then((client) => {
                        client.set(sPhone, phone);
                        res(phone);
                    });
                     //杀死子进程
                     children.forEach((cp) => {
                        cp.kill();
                    })
                }else{
                    console.log('发回来的不是手机号是什么呢');
                }
            });
        }
    });
}






