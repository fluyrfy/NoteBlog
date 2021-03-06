-- 使用 Sequelize & Sequelize-cli 套件添加表, 欄位型別語法:http://sequelize.org/master/manual/model-basics.html#strings
-- 指令：
--   0.初始化config與預設資料夾: npx sequelize-cli init
--   1.新增、創建表遷移檔: npx sequelize migration:generate --name 表名稱, Ex: npx sequelize migration:generate --name user
--   2.執行遷移: npx sequelize db:migrate
--   3.撤銷最後一次遷移: npx sequelize db:migrate:undo


-- #db.sql 創建表添加數據

-- 資料庫
CREATE DATABASE note_blog;

use note_blog;

-- 用戶表
CREATE TABLE user(
  uid INT PRIMARY KEY  NOT NULL AUTO_INCREMENT,
  uname VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  upwd VARCHAR(32) NOT NULL,
  avatar VARCHAR(300),
  selfintro VARCHAR(100),
  ctime TIMESTAMP NOT NULL DEFAULT current_timestamp ,
  permission BOOLEAN NOT NULL DEFAULT 0
);

-- 文章表
CREATE TABLE article(
  aid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  cid TINYINT NOT NULL,
  title VARCHAR(40) NOT NULL,
  content TEXT NOT NULL,
  img VARCHAR(50),
  uid INT NOT NULL,
  ctime TIMESTAMP NOT NULL DEFAULT current_timestamp,
  getLikes INT NOT NULL DEFAULT 0,
  status SMALLINT NOT NULL DEFAULT 1
);

-- 瀏覽次數表
CREATE TABLE viewCount(
  uid INT NOT NULL,
  aid INT NOT NULL,
  vtime TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (uid, aid)
);

-- 留言表
CREATE TABLE comments(
  commentid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  uid INT NOT NULL,
  aid INT NOT NULL,
  content TEXT NOT NULL,
  parentcmtid INT NOT NULL DEFAULT 0,
  ctime TIMESTAMP NOT NULL DEFAULT current_timestamp
);

-- 主題表
CREATE TABLE category(
  cid TINYINT PRIMARY KEY NOT NULL,
  cname VARCHAR(50) NOT NULL
);

-- 收藏文章表
CREATE TABLE likeArticle(
  uid INT NOT NULL,
  aid INT NOT NULL,
  PRIMARY KEY (uid, aid)
);
