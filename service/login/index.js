/**
 * 这里直接复用注册dao里面的方法
 */
var registerDao = require('../../dao/register');

module.exports = {
    userLogin: function (params) {
        /**
         * 
         */
        return registerDao.queryUserByUsername(params.username).then(function(data){
            if(data.length&&data.length===1){
                if(data[0].PASSWORD===params.password){
                    return {code:1,msg:'登录成功'}
                }else{
                    return Promise.reject({code:2,msg:'密码错误'});
                }
            }else{
                return Promise.reject({code:3,msg:'用户不存在'});
            }
        })
    },
    phoneLogin:function(params){
        return registerDao.queryUserByPhone(params.phone).then(function(data){
            if(data.length&&data.length===1){
                 return {code:1,msg:'登录成功'}
            }else{
                return Promise.reject({code:3,msg:'手机号不存在'});
            }
        })
    }
}