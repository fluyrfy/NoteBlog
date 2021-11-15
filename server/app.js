// 引入express, cors, session, mysql
const express = require("express");
// const session=require("express-session");
const session = require("express-session");
const cors = require("cors");
const mysql = require("mysql");
// const bodyParser = require('body-parser');
const qs = require("querystring");
// const request = require('request'); npm官方已禁用= =
const axios = require("axios");
const path = require("path");

// 各種金鑰、密碼設定檔
const key = require("./keyConfig/keyConfig.js");

// uuid
const { v4: uuidv4 } = require("uuid");

// 圖片處理用到的
const fileupload = require("express-fileupload");

// const multer = require('multer');
// const ejs = require('ejs');
// const path = require('path');
// // 設置儲存引擎
// const storage = multer.diskStorage({
//   destination: './public/img/user',
//   filename: function (req, file, cb) {
//     cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//   }
// });
// // 初始化上傳
// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 1000000 },
//   fileFilter: function(req, file, cb){
//     checkFileType(file, cb);
//   }
// }).single('myImage');
// // 確認檔案類型
// function checkFileType(file, cb){
//   // Allowed ext
//   const filetypes = /jpeg|jpg|png|gif/;
//   // Check ext
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   // Check mime
//   const mimetype = filetypes.test(file.mimetype);

//   if(mimetype && extname){
//     return cb(null,true);
//   } else {
//     cb('Error: Images Only!');
//   }
// }

// 創建數據庫連接池
const pool = mysql.createPool({
  host: "us-cdbr-east-04.cleardb.com",
  user: "b76431e9e629bb",
  password: key.dbPassword,
  port: 3306,
  connectionLimit: 20,
  database: "heroku_ee0beaa9e487e46",
  charset: "utf8mb4_general_ci",
});

// 創建web服務器
const PORT = process.env.PORT;
const server = express();
// 監聽端口8080
server.listen(PORT);

// 跨域處理 cors
// 配置允許訪問程序地址(腳手架)
// http://127.0.0.1:5050
// 每請求是否驗證
server.use(
  cors({
    origin: [
      "http://127.0.0.1:703",
      "http://localhost:703",
      "https://www.noteblog.site",
      "http://127.0.0.1:520",
    ], //跨域處理
    credentials: true, //是否驗證
  })
);

//配置session, 一定要在所有請求之前
server.use(
  session({
    secret: "Tedu", //"安全字符串"將安全字符串值放進加密算法中再加密
    resave: true, //每次請求是否更新原有數據
    saveUninitialized: true, //保持初始化數據
  })
);

// 配置靜態目錄
// http://127.0.0.1:8080/01.jpg
server.use(express.static(path.resolve(__dirname, "../note-blog/dist")));

// 使用內建bodyparser(註冊body-parser用法被淘汰)
// server.use(express.urlencoded({ extended: false }));
// server.use(express.json());

// express 檔案上傳套件
server.use(fileupload());

const AWS = require("aws-sdk");
const s3 = new AWS.S3({
  accessKeyId: key.s3AccessKeyId,
  secretAccessKey: key.s3SecretAccessKey,
});
//------------------------------------------------------用戶相關------------------------------------------------------
// 用戶註冊
server.post("/signup", (req, res) => {
  req.on("data", (data) => {
    // 註冊資料及驗證資料
    data = JSON.parse(data.toString());

    var token = data.token;

    //密鑰
    const secretKey = key.recaptchaSecretKey;

    // Verify URL
    const verifyUrl = `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`;

    if (token) {
      axios({
        method: "post",
        url: verifyUrl,
      })
        .then((result) => {
          if (result.data.success == true) {
            let uname = data.uname;
            let email = data.email;
            let upwd = data.upwd;
            var sql = `SELECT uid FROM user WHERE email = ?`;
            pool.query(sql, email, (err, result) => {
              if (err) {
                throw err;
              }
              if (result.length == 0) {
                var sql = `INSERT INTO user (uname, email, upwd) VALUES (?, ?, md5(?))`;
                pool.query(sql, [uname, email, upwd], (err, result) => {
                  if (err) {
                    throw err;
                  }
                  if (result.affectedRows > 0) {
                    res.send({ code: 1, msg: "用戶註冊成功" });
                  } else {
                    res.send({ code: -3, msg: "用戶註冊失敗" });
                  }
                });
              } else {
                res.send({ code: -2, msg: "電郵已被註冊過" });
              }
            });
          } else {
            res.send({ code: -1, msg: "您可能是機器人唷~~" });
          }
        })
        .catch((err) => {
          res.send(err);
        });
    }
  });
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
});

//google註冊
server.get("/googleSignup", (req, res) => {
  let e = req.query.email;
  let sql = `SELECT email, uid, permission FROM user WHERE email = ?`;
  pool.query(sql, [e], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      let email = req.query.email;
      let uname = req.query.uname;
      let upwd = req.query.upwd;
      let avatar = req.query.avatar;
      let sql = `INSERT INTO user(uname, email, upwd, avatar, permission) VALUES (?, ?, md5(?), ?, ?)`;
      pool.query(sql, [uname, email, upwd, avatar, 6], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          let email = req.query.email;
          let sql = `SELECT uid, permission FROM user WHERE email = ?`;
          pool.query(sql, [email], (err, result) => {
            if (err) throw err;
            if (result.length !== 0) {
              let uid = result[0].uid;
              let permission = result[0].permission;
              // //將用戶id保存session對象中
              req.session.uid = uid;
              req.session.permission = permission;
              let uname = req.query.uname;
              let avatar = req.query.avatar;
              let sql = `UPDATE user SET uname = ?, avatar = ? WHERE uid = ?`;
              pool.query(sql, [uname, avatar, uid], (err, result) => {
                if (err) throw err;
                if (result.affectedRows > 0) {
                  res.send({
                    code: 1,
                    msg: "google登入成功",
                    data: req.session,
                  });
                }
              });
            }
          });
        }
      });
    } else {
      let uid = result[0].uid;
      let permission = result[0].permission;
      // //將用戶id保存session對象中
      req.session.uid = uid;
      req.session.permission = permission;
      res.send({ code: 1, msg: "google登入成功", data: req.session });
    }
  });
});

// 用戶登入
server.get("/signin", (req, res) => {
  let e = req.query.email;
  let p = req.query.upwd;
  let sql = `SELECT uid, permission FROM user WHERE email = ? AND upwd = md5(?)`;
  pool.query(sql, [e, p], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: -1, msg: "帳號或密碼有誤" });
    } else {
      // //獲取當前用戶登入id
      // //result=[RowDataPacket{uid:1}]
      let uid = result[0].uid;
      let permission = result[0].permission;
      // //將用戶id保存session對象中
      req.session.uid = uid;
      req.session.permission = permission;
      res.send({ code: 1, msg: "登入成功", session: req.session });
    }
  });
});

// 用戶登出
server.get("/signout", (req, res) => {
  req.session.destroy();
});

// 查詢用戶資料
server.get("/queryUser", (req, res) => {
  let uid = req.session.uid;
  let sql = `SELECT * FROM user WHERE uid = ?`;
  if (!uid) {
    res.send({ code: -1, msg: "請先登入" });
  } else {
    pool.query(sql, [uid], (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send({ code: -2, msg: "查詢錯誤" });
      } else {
        res.send(result);
      }
    });
  }
});

// 修改用戶資料
server.post("/updateUser", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "用戶未登入" });
  }
  req.on("data", (data) => {
    data = JSON.parse(data.toString());
    let uname = data.uname;
    let upwd = data.upwd;
    let selfIntro = data.selfIntro;
    let params = [];
    let sql = "UPDATE user SET ";
    if (uname == null && upwd == null && selfIntro == null) {
      return;
    }
    if ((uname !== "" && upwd !== "") || (uname !== "" && selfIntro !== "")) {
      sql += `uname = ?, `;
      params.push(uname);
    } else if (uname !== "") {
      sql += `uname = ? `;
      params.push(uname);
    }
    if (upwd !== "" && selfIntro !== "") {
      sql += `upwd = md5(?), `;
      params.push(upwd);
    } else if (upwd !== "") {
      sql += `upwd = md5(?) `;
      params.push(upwd);
    }
    if (selfIntro !== "") {
      sql += `selfintro = ? `;
      params.push(selfIntro);
    }
    sql += `WHERE uid = ?`;
    params.push(uid);
    pool.query(sql, params, (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 1, msg: "資料修改成功" });
      } else {
        res.send({ code: -1, msg: "資料修改失敗" });
      }
    });
  });
});

// 登入驗證
server.get("/auth", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "用戶未登入" });
  } else {
    res.send({ code: 1, msg: "用戶已登入", session: uid });
  }
});

// 大頭貼
server.post("/avatar", (req, res) => {
  let uid = req.session.uid;
  if (req.files) {
    let file = req.files.file;
    let getFileExtension = function (filename) {
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
    };
    let extension = getFileExtension(file.name);
    if (extension !== undefined) {
      let filename = `${uuidv4()}.${extension}`;
      // file.mv(`./public/img/avatar/${filename}`, (err) => {
      //   if (err) throw err;
      // });
      // const params = {
      //   Bucket: "noteblog", // 相簿位子
      //   Key: filename, // 你希望儲存在 S3 上的檔案名稱
      //   Body: file, // 檔案
      // };
      const params = {
        Bucket: "noteblog/avatar", // 相簿位子
        Key: filename, // 你希望儲存在 S3 上的檔案名稱
        Body: file.data, // 檔案
        ContentType: file.mimetype,
        ACL: "public-read", // 檔案權限
      };

      s3.upload(params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log("Bucket Created Successfully", data.Location);
      });
      let sql = `UPDATE user SET avatar = ? WHERE uid = ?`;
      pool.query(sql, [filename, uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "圖片上傳成功" });
        } else {
          res.send({ code: -1, msg: "圖片上傳失敗" });
        }
      });
    }
  } else {
    return;
  }
});

//------------------------------------------------------文章相關------------------------------------------------------
// 初始化主題列表
server.get("/category", (req, res) => {
  if (Object.keys(req.query).length !== 0) {
    let cid = req.query.cid;
    let sql = `SELECT cname FROM category WHERE cid = ?`;
    pool.query(sql, [cid], (err, result) => {
      if (err) throw err;
      res.send({ code: 1, msg: "當前主題", data: result });
    });
  } else if (JSON.stringify(req.query) === "{}") {
    let sql = `SELECT * FROM category ORDER BY cid ASC`;
    pool.query(sql, (err, result) => {
      if (err) throw err;
      res.send({ code: 1, msg: "初始化主題", data: result });
    });
  }
});

// 新增文章
server.post("/write", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "請先登入" });
    return;
  }
  let data = JSON.parse(req.body.data);
  let category = data.category;
  let title = data.title;
  let content = data.content;
  let params = [category, title, content, uid];
  let sql = `INSERT INTO article (cid, title, content, uid`;
  let sql2 = ` VALUES (?, ?, ?, ?`;
  if (req.files) {
    let file = req.files.file;
    let getFileExtension = function (filename) {
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
    };
    let extension = getFileExtension(file.name);
    if (extension !== undefined) {
      let filename = `${uuidv4()}.${extension}`;
      // file.mv(`./public/img/article/${filename}`, (err) => {
      // if (err) throw err;
      const s3params = {
        Bucket: "noteblog/article", // 相簿位子
        Key: filename, // 你希望儲存在 S3 上的檔案名稱
        Body: file.data, // 檔案
        ContentType: file.mimetype,
        ACL: "public-read", // 檔案權限
      };

      s3.upload(s3params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log("Bucket Created Successfully", data.Location);
      });
      params.splice(4, 0, filename);
      sql += `, img)`;
      sql2 += `, ?)`;
      sql += sql2;
      pool.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "文章新增成功" });
        } else {
          res.send({ code: -1, msg: "文章新增失敗" });
        }
      });
      // });
    }
  } else {
    sql += `)`;
    sql2 += `)`;
    sql += sql2;
    pool.query(sql, params, (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 1, msg: "文章新增成功" });
      } else {
        res.send({ code: -1, msg: "文章新增失敗" });
      }
    });
  }
});

// 修改文章
server.post("/edit", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "用戶未登入" });
    return;
  }
  let data = JSON.parse(req.body.data);
  let aid = data.aid;
  let title = data.title;
  let category = data.category;
  let content = data.content;
  let params = [title, category, content, aid];
  let sql = `UPDATE article SET title = ?, cid = ?, content = ?`;
  if (req.files) {
    let file = req.files.file;
    let getFileExtension = function (filename) {
      return /[.]/.exec(filename) ? /[^.]+$/.exec(filename)[0] : undefined;
    };
    let extension = getFileExtension(file.name);
    if (extension !== undefined) {
      let filename = `${uuidv4()}.${extension}`;
      // file.mv(`./public/img/article/${filename}`, (err) => {
      // if (err) throw err;
      const s3params = {
        Bucket: "noteblog/article", // 相簿位子
        Key: filename, // 你希望儲存在 S3 上的檔案名稱
        Body: file.data, // 檔案
        ContentType: file.mimetype,
        ACL: "public-read", // 檔案權限
      };
      s3.upload(s3params, function (err, data) {
        if (err) console.log(err, err.stack);
        else console.log("Bucket Created Successfully", data.Location);
      });
      params.splice(3, 0, filename);
      sql += `, img = ? WHERE aid = ?`;
      pool.query(sql, params, (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
          res.send({ code: 1, msg: "文章修改成功" });
        } else {
          res.send({ code: -1, msg: "文章修改失敗" });
        }
      });
      // });
    }
  } else {
    sql += ` WHERE aid = ?`;
    pool.query(sql, params, (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 1, msg: "文章修改成功" });
      } else {
        res.send({ code: -1, msg: "文章修改失敗" });
      }
    });
  }
});

// 刪除文章
server.get("/delete", (req, res) => {
  let aid = req.query.aid;
  let sql = `UPDATE article SET status = -1 WHERE aid = ?`;
  pool.query(sql, [aid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "文章刪除成功" });
    } else {
      res.send({ code: -1, msg: "文章刪除失敗" });
    }
  });
});

// 概覽文章
server.get("/list", (req, res) => {
  let t = req.query.topic;
  if (t == 0 || t == undefined) {
    let sql = `SELECT a.*, b.uname FROM (SELECT a.*, b.viewcount FROM article AS a LEFT JOIN (SELECT aid, COUNT(*) AS viewcount FROM viewcount GROUP BY aid) AS b ON a.aid = b.aid WHERE a.status <> -1) AS a LEFT JOIN user AS b ON a.uid=b.uid`;
    pool.query(sql, (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send({ code: -1, msg: "目前暫無文章" });
      } else {
        res.send({ code: 1, msg: "查詢到文章", data: result });
      }
    });
  } else {
    let sql = `SELECT a.*, b.uname FROM (SELECT a.*, b.viewcount FROM article AS a LEFT JOIN (SELECT aid, COUNT(*) AS viewcount FROM viewcount GROUP BY aid) AS b ON a.aid = b.aid WHERE a.cid = ? AND a.status <> -1) AS a LEFT JOIN user AS b ON a.uid=b.uid`;
    pool.query(sql, [t], (err, result) => {
      if (err) {
        throw err;
      }
      if (result.length == 0) {
        res.send({ code: -1, msg: "目前主題暫無文章" });
      } else {
        res.send({ code: 1, msg: "查詢到文章", data: result });
      }
    });
  }
});

// 查詢個人文章列表
server.get("/listUser", (req, res) => {
  let u = req.session.uid;
  let sql = `SELECT a.*, b.viewcount FROM article AS a LEFT JOIN (SELECT aid, COUNT(*) AS viewcount FROM viewcount GROUP BY aid) AS b ON a.aid = b.aid WHERE a.uid = ? AND a.status <> -1`;
  pool.query(sql, [u], (err, result) => {
    if (err) {
      throw err;
    }
    if (result.length == 0) {
      res.send({ code: -1, msg: "目前暫無文章" });
    } else {
      res.send({ code: 1, msg: "查詢到文章", data: result });
    }
  });
});

// 查詢個人獲讚數
server.get("/gainLikeNum", (req, res) => {
  let uid = req.session.uid;
  let sql = `SELECT COUNT(a.aid) AS likeNum, a.uid, b.* FROM article AS a INNER JOIN likeArticle AS b on a.aid = b.aid where a.uid = ?`;
  pool.query(sql, [uid], (err, result) => {
    if (err) throw err;
    if (result.length !== 0) {
      res.send({ code: 1, msg: "查詢獲讚數", data: result[0].likeNum });
    }
  });
});

// 指定閱覽文章
server.get("/read", (req, res) => {
  let aid = req.query.aid;
  let sql = `SELECT a.*, b.commentid, b.uid AS cmtuid, b.cmtuname, b.cmtavatar,b.permission, b.content AS cmtcontent, b.parentcmtid, b.ctime AS cmttime FROM article AS a LEFT JOIN (SELECT a.*, b.uname AS cmtuname, b.avatar AS cmtavatar, b.permission FROM comments AS a LEFT JOIN user AS b ON a.uid = b.uid) AS b ON a.aid = b.aid WHERE a.aid = ?;`;
  pool.query(sql, [aid], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: -1, msg: "找不到此篇文章" });
    } else {
      res.send({ code: 1, msg: "找到指定文章", data: result });
    }
  });
});

// 文章瀏覽次數查詢
server.get("/viewTime", (req, res) => {
  let aid = req.query.aid;
  let sql = `SELECT COUNT(uid) FROM viewCount WHERE aid = ?`;
  pool.query(sql, [aid], (err, result) => {
    if (err) throw err;
    else {
      res.send(result);
    }
  });
});

// 文章瀏覽次數計算
server.get("/viewCount", (req, res) => {
  let uid = req.session.uid;
  let aid = req.query.aid;
  let sql = `SELECT * FROM viewCount WHERE uid = ? AND aid = ?`;
  if (uid !== 0 && uid !== undefined) {
    pool.query(sql, [uid, aid], (err, result) => {
      if (err) {
        throw err;
      } else if (result.length == 0 && uid !== 0 && uid !== undefined) {
        let sql = `INSERT INTO viewCount (uid, aid) VALUES (?, ?)`;
        pool.query(sql, [uid, aid], (err, result) => {
          if (err) throw err;
          if (result.affectedRows > 0) {
            res.send("瀏覽次數增加");
          }
        });
      }
    });
  }
});

// 新增留言
server.post("/addComment", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "用戶未登入" });
    return;
  }
  req.on("data", (data) => {
    data = JSON.parse(data.toString());
    let aid = data.aid;
    let content = data.content;
    let sql = `INSERT INTO comments (uid, aid, content) VALUES (?, ?, ?)`;
    pool.query(sql, [uid, aid, content], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 1, msg: "留言新增成功" });
      } else {
        res.send({ code: -1, msg: "留言新增失敗" });
      }
    });
  });
});

// 新增子留言
server.post("/addChildComment", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "用戶未登入" });
    return;
  }
  req.on("data", (data) => {
    data = JSON.parse(data.toString());
    let aid = data.aid;
    let childComment = data.childComment;
    let parentcmtid = data.parentcmtid;
    let sql = `INSERT INTO comments (uid, aid, content, parentcmtid) VALUES (?, ?, ?, ?)`;
    pool.query(sql, [uid, aid, childComment, parentcmtid], (err, result) => {
      if (err) throw err;
      if (result.affectedRows > 0) {
        res.send({ code: 1, msg: "子留言新增成功" });
      } else {
        res.send({ code: -1, msg: "子留言新增失敗" });
      }
    });
  });
});

//------------------------------------------------------收藏相關------------------------------------------------------
// 收藏作者
// server.get('/likeAuthor', (req, res) => {

// })

// 收藏文章
server.get("/likeArticle", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "用戶未登入" });
    return;
  }
  let aid = req.query.aid;
  let sql = `INSERT INTO likeArticle (uid, aid) VALUES (?, ?)`;
  pool.query(sql, [uid, aid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "按讚成功" });
    } else {
      res.send({ code: -1, msg: "按讚失敗" });
    }
  });
});

// 取消收藏文章
server.get("/cancelLikeArticle", (req, res) => {
  let uid = req.session.uid;
  if (!uid) {
    res.send({ code: 0, msg: "用戶未登入" });
    return;
  }
  let aid = req.query.aid;
  let sql = `DELETE FROM likeArticle WHERE uid = ? AND aid = ?;`;
  pool.query(sql, [uid, aid], (err, result) => {
    if (err) throw err;
    if (result.affectedRows > 0) {
      res.send({ code: 1, msg: "取消按讚成功" });
    } else {
      res.send({ code: -1, msg: "取消按讚失敗" });
    }
  });
});

// 查詢文章是否被收藏
server.get("/queryLikeArticle", (req, res) => {
  let uid = req.session.uid;
  let aid = req.query.aid;
  let sql = `SELECT * FROM likeArticle WHERE uid = ? AND aid = ?`;
  pool.query(sql, [uid, aid], (err, result) => {
    if (err) throw err;
    if (result.length == 0) {
      res.send({ code: 1, msg: "尚未按讚" });
    } else {
      res.send({ code: -1, msg: "已按讚" });
    }
  });
});

// 查詢文章收藏數
server.get("/numOfLikeArticle", (req, res) => {
  let aid = req.query.aid;
  let sql = `SELECT COUNT(*) FROM likearticle WHERE aid = ?;`;
  pool.query(sql, [aid], (err, result) => {
    res.send({ code: 1, msg: "按讚數量", data: result });
  });
});

// 收藏主題
server.get("/likeTopic", (req, res) => {});
