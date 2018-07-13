var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');

/**
 * 初始化redis
 */


var app = express();
app.listen(8888, function () {
    console.log('服务启动成功');
})
/**
 * 静态目录设置
 * 
 */
app.use(express.static(__dirname + '/static'));
/**
 * session 设置
 */
app.use(cookieParser());
app.use(session({
    secret: '12345',
    name: 'app',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid 
    cookie: { maxAge: 80000 },  //设置maxAge是80000ms，即80s后session和相应的cookie失效过期
    resave: false,
    saveUninitialized: true,
}));
/**
 * 自动解析post body体
 * application/json与application/x-www-form-urlencoded
 * 注意这是全局设置
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/**
 * 路由实例及挂载
 * 
 */
var adminRouter = require('./route/admin');
app.use('/admin',adminRouter)
/**
 * 注册路由
 */
// var registerServ = require('./service/register');
// app.post('/register', function (req, res) {
//     registerServ.register(req.body).then(function () {
//         res.send({ code: 1, msg: '恭喜注册成功' })
//     }).catch(function (err) {
//         console.log('run in error', err);
//         res.send({ code: err.code, msg: err.msg })
//     });

// })
// /**
//  * 用户登录
//  */
// var loginServ = require('./service/login');
// app.post('/userLogin', function (req, res) {
//     loginServ.userLogin(req.body).then((data)=>{
//         if(data.code===1){
//             res.send({
//                 code:1,
//                 msg:'登录成功'
//             });
//         }else{
//             res.send({
//                 code:data.code,
//                 msg:data.msg
//             });
//         }
//     }).catch((err)=>{
//         res.send({
//             code:err.code,
//             msg:err.msg
//         });
//     })

// })
// //手机登录
// app.post('/phoneLogin', function (req, res) {
//     if(req.session.code===req.body.code){
//         loginServ.phoneLogin(req.body).then((data)=>{
//             if(data.code===1){
//                 res.send({
//                     code:1,
//                     msg:'登录成功'
//                 });
//             }else{
//                 res.send({
//                     code:data.code,
//                     msg:data.msg
//                 });
//             }
//         }).catch((err)=>{
//             res.send({
//                 code:err.code,
//                 msg:err.msg
//             });
//         })
//     }else{
//         res.send({
//             code:4,
//             msg:'验证码错误'
//         });
//     }
    
// })
// /**
//  * 获取验证码
//  */
// app.get('/getCode', function (req, res) {
//     console.log(req.headers);
//     var code = Math.floor(Math.random()*1000000);
//     var codeStr = code+'';
//     var temp = '';
//     for(var i=0;i<6;i++){
//         if(!codeStr[i]){
//             temp+='0';
//         }
//     }
//     code+=temp;
//     req.session.code = code;
//     res.send({
//         code:0,
//         data:{
//             code:code
//         }
//     });
// })