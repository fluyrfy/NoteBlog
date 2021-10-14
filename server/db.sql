-- #db.sql 創建表添加數據

-- 用戶表
CREATE TABLE user(
  uid INT PRIMARY KEY  NOT NULL AUTO_INCREMENT,
  uname VARCHAR(40) NOT NULL,
  email VARCHAR(40) NOT NULL,
  upwd VARCHAR(32) NOT NULL,
  ctime TIMESTAMP NOT NULL DEFAULT current_timestamp ,
  permission BOOLEAN NOT NULL default 0
);

-- 文章表
CREATE TABLE article(
  aid INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  cid TINYINT NOT NULL,
  title VARCHAR(40) NOT NULL,
  content TEXT NOT NULL,
  uid INT NOT NULL,
  ctime TIMESTAMP NOT NULL DEFAULT current_timestamp,
  getLikes INT NOT NULL default 0
);

-- 瀏覽次數表
CREATE TABLE viewCount(
  uid INT NOT NULL,
  aid INT NOT NULL,
  vtime TIMESTAMP NOT NULL DEFAULT current_timestamp,
  PRIMARY KEY (uid, aid)
);
