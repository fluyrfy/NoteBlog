// 引入express, cors, session, mysql
const express = require('express');
const session=require("express-session");
const cors=require("cors");
const mysql=require("mysql");
// const bodyParser = require('body-parser');
const qs = require('querystring');
// const request = require('request'); npm官方已禁用= =
const axios = require('axios');

// 創建數據庫連接池
const pool=mysql.createPool({
  host:"127.0.0.1",
  user:"root",
  password:"",
  port:3306,
  connectionLimit:20,
  database:"note_blog"
})

// 創建web服務器
const server = express();
// 監聽端口8080
server.listen(8081);

// 跨域處理 cors
  // 配置允許訪問程序地址(腳手架)
      // http://127.0.0.1:5050
  // 每請求是否驗證
  server.use(cors({
    origin:["http://127.0.0.1:8080","http://localhost:8080"],//跨域處理
    credentials:true //是否驗證
  }))

//配置session, 一定要在所有請求之前
server.use(session({
  secret:"Tedu",//"安全字符串"將安全字符串值放進加密算法中再加密
  resave:true,//每次請求是否更新原有數據
  saveUninitialized:true, //保持初始化數據
}))

// 配置靜態目錄
// http://127.0.0.1:8080/01.jpg
server.use(express.static("public"));

// 使用內建bodyparser(註冊body-parser用法被淘汰)
// server.use(express.urlencoded({ extended: false }));
// server.use(express.json());

//------------------------------------------------------用戶相關------------------------------------------------------
// 用戶註冊
server.post('/signup', (req, res) => {
  req.on('data', (data) => {
    console.log(data);

    // 註冊資料及驗證資料
    data = JSON.parse(data.toString());
    console.log(data)
    var token = data.token;

    //密鑰
    const secretKey = '6Le57aQcAAAAADGohwyyP1caNRoWs0JdFKMM85Gq';

    // Verify URL
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    if (token) {
      axios({
        method: 'post',
        url: verifyUrl,
      }).then(result => {
        console.log(result.data);
        if (result.data.success == true) {
          let uname = data.uname;
          let email = data.email;
          let upwd = data.upwd;
          var sql=`SELECT uid FROM user WHERE email = '${email}'`
          pool.query(sql, (err, result) => {
            if (err) {
              throw err;
            }else {
              console.log(result);
            }
            if (result.length == 0) {
              var sql = `INSERT INTO user (uname, email, upwd) VALUES ('${uname}', '${email}', md5('${upwd}'))`
              pool.query(sql, (err, result) => {
                if (err) {
                  throw err;
                }
                if(result.affectedRows > 0){
                  res.send({code: 1, msg: "用戶註冊成功"});
                }else{
                  res.send({code: -3 ,msg: "用戶註冊失敗"});
                }
              })
            }else {
              res.send( { code: -2, msg: '電郵已被註冊過' } )
            }
          })
        }else {
          res.send( { code: -1, msg: '您可能是機器人唷~~' } )
        }
      }).catch(err => {
        res.send(err);
      });
    }

  })
  // // 驗證資料是否為空
  // if (req.body.captcha === undefined || req.body.captcha === '' || req.body.captcha === null) {
  //   return res.json({ "seccess": false, "msg": "Please select captcha" });
  // }



  // // Make Request To VerifyURL
  // request(verifyUrl, (err, response, body) => {
  //   body = JSON.parse(body);
  //   // If Not Successful
  //   if (body.success !== undefined && !body.success) {
  //     return res.json({ "seccess": false, "msg": "Failed captcha verification" });
  //   }else {
  //     return res.json({ "seccess": true, "msg": "Captcha passed" });
  //   }
  // })


  // let uname = req.query.uname;
  // let email = req.query.email;
  // let upwd = req.query.upwd;
  // var sql=`SELECT uid FROM user WHERE email = '${email}'`
  // pool.query(sql, (err, result) => {
  //   if (err) {
  //     throw err;
  //   }else {
  //     console.log(result);
  //   }
  //   if (result.length == 0) {
  //     var sql = `INSERT INTO user (uname, email, upwd) VALUES ('${uname}', '${email}', md5('${upwd}'))`
  //     pool.query(sql, (err, result) => {
  //       if (err) {
  //         throw err;
  //       }
  //       if(result.affectedRows > 0){
  //         res.send({code: 1, msg: "用戶註冊成功"});
  //       }else{
  //         res.send({code: -2 ,msg: "用戶註冊失敗"});
  //       }
  //     })
  //   }else {
  //     res.send( { code: -1, msg: '電郵已被註冊過' } )
  //   }

  // })
})

// 用戶登入
server.get('/signin', (req, res) => {

})

//------------------------------------------------------文章相關------------------------------------------------------
// 新增文章
server.get('/write', (req, res) => {

})

// 修改文章
server.get('/edit', (req, res) => {

})

// 刪除文章
server.get('/delete', (req, res) => {

})

// 查詢文章
server.get('/query', (req, res) => {

})

//------------------------------------------------------收藏相關------------------------------------------------------
// 收藏作者
server.get('/likeAuthor', (req, res) => {

})

// 收藏文章
server.get('/likeArticle', (req, res) => {

})

// 收藏主題
server.get('/likeTopic', (req, res) => {

})
