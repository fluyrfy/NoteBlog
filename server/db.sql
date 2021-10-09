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
