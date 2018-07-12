var redis = require('redis');
module.exports = {
    connect: function () {
        return new Promise(function (res, rej) {
            var RDS_PORT = 6379,        //端口号
                RDS_HOST = '127.0.1.1',    //服务器IP
                RDS_PWD = 'datang',//密码
                RDS_OPTS = { auth_pass: RDS_PWD },            //设置项
                client = redis.createClient(RDS_PORT, RDS_HOST);
            client.on('ready', function (data) {
                res(client);
            })
        })

    },
    get: async function (key) {
        var client = await this.connect();
        return new Promise((res, rej) => {
            client.get(key, (err, value) => {
                if (!err) {
                    res(value);
                } else {
                    rej(err);
                }
            });
        });
    }
}
