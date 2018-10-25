var express = require('express');
var path = require('path');      //引入路径模块
var bodyParser = require('body-parser');//引入body-parser插件
var session = require('express-session');
var router = require('./router');//引入路由
var app = express();

app.use('/public/',express.static(path.join(__dirname,'./public/')));
app.use('/node_modules/',express.static(path.join(__dirname,'./node_modules/')));//开放两个文件

app.engine('html',require('express-art-template'));//引用art-template模板

// parse application/x-www-form-urlencoded  引入body-parser插件获取post表单
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json({ 'limit':'10000kb'}));

app.use(session({
    secret:'keyboard cat',  //secret加密字符窜
    resave:false,
    saveUninitialized:true
}));

//把路由挂载在app中
app.use(router);
app.listen(3000,function () {
    console.log('running');
});