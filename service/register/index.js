var registerDao = require('../../dao/register');

module.exports = {
    register: function (user) {
        /**
         * 首先查询用户名是否重复
         */
        return registerDao.queryUserByUsername(user.username).then(function(data){
        if (data.length &&data.length > 0) {
            return Promise.reject({ code: 2, msg: '该用户名已存在' });
        } else {
            /**
             * 然后查询手机号是否重复
             */
             return registerDao.queryUserByPhone(user.phone)
        }
        }).then(function(data){
            if(data.length&&data.length > 0){
                return Promise.reject ({ code: 3, msg: '该手机号已被使用' });
            }else{
                return registerDao.addUser(user);
            }
        })
    }
}