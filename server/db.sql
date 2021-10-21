-- #db.sql 創建表添加數據

-- 用戶表
CREATE TABLE user(
  uid INT PRIMARY KEY  NOT NULL AUTO_INCREMENT,
  uname VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  upwd VARCHAR(32) NOT NULL,
  avatar VARCHAR(50),
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
  uid INT,
  aid INT,
  content TEXT NOT NULL,
  parentcmtid INT NOT NULL DEFAULT 0,
  ctime TIMESTAMP NOT NULL DEFAULT current_timestamp
);
