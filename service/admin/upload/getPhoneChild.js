var md5 = require('md5');

process.on('message', function (data) {
    for (var i = 0; i < data.list.length; i++) {
        for (var j = 0; j < 10000; j++) {
            var temp = data.list[i] + formatNum(j);
            if (md5(temp).toUpperCase() == data.sPhone.toUpperCase()) {
                console.log('找到手机号了============',temp);
                process.send(temp);
                return;
            }
        }
    }
    //当前进程没找到
    process.send(0);
    
});
function formatNum(num) {
    num += ''; 
    if (num.length < 4) {
        var step = 4 - num.length;
        for (var i = 0; i < step; i++) {
            num = '0' + num;
        }
    }
    return num;
}