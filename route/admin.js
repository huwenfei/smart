var express = require('express');
var router = express.Router();

/**
 * 登录
 */
var loginServer = require('../service/admin/login');
router.post('/login',(req,res)=>{
    loginServer.login(req.body).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send({
            code:err.code,
            msg:err.msg
        })
    })
})
/**
 * 上传
 */
var uploadServer = require('../service/admin/upload');
router.post('/upload',(req,res)=>{
    uploadServer.upload(req).then((data)=>{
        res.send(data);
    }).catch((err)=>{
        res.send(err);
    })
    
    // .then((data)=>{
    //     res.send(data);
    // }).catch((err)=>{
    //     res.send({
    //         code:err.code,
    //         msg:err.msg
    //     })
    // })
})
module.exports = router;