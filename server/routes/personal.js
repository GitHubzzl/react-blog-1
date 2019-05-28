const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const dbConfig = require('../db/DBConfig');
const personalSQL = require('../db/Personalsql');
const responseClient = require('../util/utils.js');
const connection = mysql.createConnection(dbConfig.mysql);



