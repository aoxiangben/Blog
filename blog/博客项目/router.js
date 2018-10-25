var express = require('express');
var User = require('./models/user');
var router = express.Router();

router.get('/',function (req,res) {
    res.render('index.html',{
        user:req.session.user  //渲染用户状态
    })
});
router.get('/login',function (req,res) {
    res.render('login.html')
});
router.post('/login',function (req,res) {
       var body = req.body;
       User.findOne({
           email:body.email,
           password:body.password
       },function (err,user) {
           if(err){
               return res.status(500).json({
                   err_code:500,
                   message:err.message
               })
           }
           if(!user){
               return res.status(200).json({
                   err_code:1,
                   message:'账号或密码已存在'
               })
           }
           //用户存在，登陆成功，记录状态
           req.session.user = user;

           //注册成功
           res.status(200).json({
               err_code:0,
               message:'ok'
           })
       })
});
//退出操作
router.get('/logout',function (req,res) {
    //清空数据
    req.session.user=null;
    //重定向页面
    res.redirect('/login')
});

router.get('/setting',function (req,res) {
    res.render('setting.html')
});
router.post('/setting',function (req,res) {

});
router.get('/blo',function (req,res) {
    res.render('blo.html')
});
router.post('/blo',function (req,res) {

});
router.get('/register',function (req,res) {
    res.render('register.html')
});
router.post('/register',function (req,res) {
//1.获取表单数据 2.操作数据库 3 发送响应  4安装body-parser插件
    var body = req.body;
    User.findOne({
        $or:[
            {
                email:body.email
            },
            {
                nickname:body.nickname
            }
        ]
    },function (err,data) {
        if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'server error'
                })
        }if(data){
            //邮箱或用户名已存在
            return res.status(200).json({
                err_code:1,
                message:'账号或邮箱已存在'
            })
        }
        new User(body).save(function (err,user) {
            if(err){
                return res.status(500).json({
                    err_code:500,
                    message:'server error'
                })
            }
            //注册成功。通过session记录登陆状态
             req.session.user = user;

            //注册成功
            res.status(200).json({
                err_code:0,
                message:'ok'
            })
        })
    })
});

module.exports=router;