
var loginDao = require('../../../dao/admin/login');

module.exports = {
    login: function (params) {
        /**
         * 根据姓名查找管理员
         */
        return loginDao.queryUserByName(params.name).then((data)=>{
            if(data&&data.length&&data.length===1){
                if(data[0].PASSWORD===params.password){
                    return {code:1,msg:'登录成功'} 
                }else{
                    return Promise.reject({code:2,msg:'密码错误'});
                }
            }else{
                return Promise.reject({code:3,msg:'用户不存在'});
            }
        })
    }
}