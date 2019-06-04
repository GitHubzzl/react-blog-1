var express = require('express');
var router = express.Router();
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../db/DBConfig');
var articleSQL = require('../db/Articlesql');
var userSQL = require('../db/Usersql');
var responseClient = require('../util/utils.js')
// 使用DBConfig.js的配置信息创建一个MySQL连接池
// var pool = mysql.createPool( dbConfig.mysql );
var connection = mysql.createConnection(dbConfig.mysql);
var lodash = require('lodash');
// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({     code:'-200',     msg: '操作失败'   
        }); 
    } else { 
      res.json(ret); 
  }};


// 发布文章
router.post('/addArticle', function(req, res, next){
 // 从连接池获取连接
    // get请求是res.body；post请求是res.query
    var param = req.query;
// 建立连接 增加一个用户信息
//     var updateTime = Date.parse(new Date());
    var updateTime = new Date().toLocaleDateString()
    console.log(updateTime)
if (param && param.id) {
    // 存在文章ID，则为update文章
    connection.query(articleSQL.updateArticle, [param.title,param.content,param.type,param.is_publish,updateTime,param.id], function(err, result) {
        if(result) {
            responseClient(res, 200, 1, '更新成功')
        } else {
            responseClient(res, 400, 2, '更新失败')
        }
        // 释放连接
        //connection.release();
        });
        } else {
            // 新增文章
    connection.query(articleSQL.insert, [param.userId,param.title,param.content,param.type,param.is_publish,updateTime], function(err, result) {
                if(result) {
                    responseClient(res, 200, 1, '发布成功')
                } else {
                    responseClient(res, 400, 2, '发布失败')
                }
                 // 释放连接
                //connection.release();
               });
            }

 });

// 加载首页文章列表
 router.post('/pullIndexArticle', function(req, res, next){
   // 从article表中获取文章
   connection.query(articleSQL.queryAll,  function(err, result) {
           if(result) {
               let task =[];
               result.forEach((item,i) => {
                   let taskItem = new Promise( (resolve, reject) => {
                       connection.query(userSQL.findUser, [result[i].user_id], function(err, user) {
                           if(user) {
                               let author = {
                                   id:user[0].id,
                                   img:user[0].img,
                                   nickname:user[0].nickname,
                                   personalIntro:user[0].personal_intro
                               }
                               let response = {
                                   id:result[i].id,
                                   title:result[i].title,
                                   content:result[i].content,
                                   type:result[i].type,
                                   isPublish:result[i].is_publish,
                                   author:author
                               }
                               resolve(response);
                           }
                       });
                   })
                   task.push(taskItem);
               })
               Promise.all(task).then(function (data) {
                   responseClient(res, 200, 1, '拉取成功',data)
               })
           } else {
               responseClient(res, 400, 2, '拉取失败')
           }
        // 释放连接  
       //   connection.release();
          });
    });



// 加载当前用户文章列表
router.post('/pullUserArticle', function(req, res, next){
    // 从article表中获取文章
    var params = req.body;
    connection.query(articleSQL.queryUserArticle , [params.id],function(err, result) {
            if(result) {
                 responseClient(res, 200, 1, '获取当前用户文章成功',result)
            } else {
                responseClient(res, 400, 2, '获取当前用户文章失败')
            }
         // 释放连接  
        //   connection.release();  
    
           });
     });

// 编辑当前文章
router.post('/pullArticle',function (req,res,next) {
    var params = req.body
    connection.query(articleSQL.queryArticle,[params.id],function (err,result) {
        if(result){
            responseClient(res,200,1,'获取文章成功',...result);
        }else{
            responseClient(res,400,2,'获取文章失败');
        }
    })
})
// 删除当前文章
router.post('/deleteArticle', function(req, res, next){
    // 从article表中获取文章
    var param = req.body;
    connection.query(articleSQL.deleteArticle ,[param.id], function(err, result) {
            if(result) {  
                 responseClient(res, 200, 1, '删除成功')
            } else {
                responseClient(res, 400, 2, '删除失败')
            }
         // 释放连接  
        //   connection.release();  
    
           });
     });
     
module.exports = router;
