$('.register').on('click',function(){
    $.ajax({
        url:'/register',
        type:'post',
        data:{
            username:'huwenfei1',
            password:md5('123456'),
            phone:'15313085071'
        },
        success:function(data){
            console.log(data);
        }
    });
});
$('.userlogin').on('click',function(){
    $.ajax({
        url:'/userLogin',
        type:'post',
        data:{
            username:'huwenfei1',
            password:md5('123456'),
        },
        success:function(data){
            console.log(data);
        }
    });
});
$('.phonelogin').on('click',function(){
    $.ajax({
        url:'/phoneLogin',
        type:'post',
        data:{
            phone:'15313085070',
            code:code,
        },
        success:function(data){
            console.log(data);
        }
    });
});
var code = 1;
$('.getcode').on('click',function(){
    $.ajax({
        url:'/getCode',
        type:'post',
        data:{},
        success:function(data){
            code = data.data.code;
        }
    });
});
// console.log(md5(123));
// var promise = new Promise(function(res,rej){
//     if(0){
//         res(2);
//     }else{
//         rej(3)
//     }
// });
// promise.then(function(data){
//     // return new Promise(function(res,rej){
//     //     rej(data);
//     // });
//     return 1;
// }).then(function(data){
//     console.log('run in success');
// }).catch(function(){
//     console.log('catch 1');
// })