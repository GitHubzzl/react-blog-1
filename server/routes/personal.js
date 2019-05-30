const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/DBConfig');
const personalSQL = require('../db/Personalsql');
const responseClient = require('../util/utils.js');
const connection = mysql.createConnection(dbConfig.mysql);
const responseJSON = function (res,ret) {
    if(typeof ret==='undefined') {
        res.json({
            code:'-200',
            msg:'操作失败'
        });
    }else{
        res.json(ret);
    }
}

module.exports = router
