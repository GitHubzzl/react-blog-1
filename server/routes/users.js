var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var userSQL = require('../db/Usersql');
var responseClient = require('../util/utils.js')
// 使用DBConfig.js的配置信息创建一个MySQL连接池
// var pool = mysql.createPool( dbConfig.mysql );
var connection = mysql.createConnection(dbConfig.mysql);
// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({     code:'-200',     msg: '操作失败'   
        }); 
    } else { 
      res.json(ret); 
  }};


// 添加用户
router.get('/addUser', function(req, res, next){
    // 获取前台页面传过来的参数  
    var param = req.query || req.params;   
    // 建立连接 增加一个用户信息 
    connection.query(userSQL.insert, [param.username,param.password], function(err, result) {
        if(result) {
            responseClient(res, 200, 1, '添加成功')
        } else {
            responseClient(res, 400, 2, '添加失败')
        }
        // 释放连接  
        connection.release();  
        });
 });

 // 登陆
 router.all('/login', function(req, res, next){
    if (req.method == "POST") {
        var param = req.body;
    } else{
        var param = req.query || req.params; 
    }

    connection.query(userSQL.getUserByInfo,[param.username,param.password],function (err, results){
        if (err){
            throw err
        }else{
                // 数据库存在 
                if (results.length == 0) {
                    // res.end(JSON.stringify({status:'102',msg:'用户名或密码错误'}));
                    responseClient(res, 200, 2, '用户名或密码错误')
                } else { 
                    if (results[0].username == param.username && results[0].password == param.password) {
                        // res.end(JSON.stringify({status:'100',msg:'登录成功'}));
                        let user = {
                            _id:results[0].id,
                            username:results[0].username
                        }
                        //console.log(results)
                        // req.cookies.set('userInfo',JSON.stringify(user))
                        res.cookie('user', user, { expires: new Date(Date.now() + 900000), httpOnly: true });
                        let response = {
                            id:results[0].id,
                            nickname:results[0].nickname
                        }
                        responseClient(res, 200, 1, '登录成功',{...response})
                    }
                }
       }
    })
});

// 获取用户信息
router.get('/getUserInfo', function(req, res, next){
    // 获取前台页面传过来的参数  
    // console.log("cookies",req.cookies.user,req.cookies['user'],req.cookies)
    // var user = {
    //     id:req.cookies.user._id,
    //     username:req.cookies.user.username,
    // }
    var param = req.query || req.params;
    // 建立连接 查询用户信息
    connection.query(userSQL.findUser, [param.id], function(err, result) {
        if(result) {
            let response = {
                id:result[0].id,
                img:result[0].img,
                nickname:result[0].nickname,
                personalIntro:result[0].personal_intro
            }
            responseClient(res, 200, 1, '查询成功',{...response})
        } else {
            responseClient(res, 400, 2, '查询失败')
        }
        });
 });

// 修改用户信息
router.post('/updateUserInfo', function(req, res, next){
    // 获取前台页面传过来的参数  
    // console.log("cookies",req.cookies.user,req.cookies['user'],req.cookies)
    let params = req.body;
    // 建立连接 更新用户信息
    connection.query(userSQL.updateUserPersonalIntro, [params.personalIntro,params.id], function(err, result) {
        if(result) {
            connection.query(userSQL.findUser, [params.id], function(err, result) {
                if(result) {
                    let response = {
                        id:result[0].id,
                        img:result[0].img,
                        nickname:result[0].nickname,
                        personalIntro:result[0].personal_intro
                    }
                    responseClient(res, 200, 1, '修改成功',{...response})
                } else {
                    responseClient(res, 400, 2, '查询失败')
                }
            });
            //responseClient(res, 200, 1, '修改成功',result)
        } else {
            responseClient(res, 400, 2, '添加失败')
        }
        });

});

module.exports = router;
