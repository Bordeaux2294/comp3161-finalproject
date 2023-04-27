DROP DATABASE IF EXISTS school;
CREATE DATABASE school;
USE school;

CREATE TABLE student(sid int PRIMARY KEY NOT NULL AUTO_INCREMENT,sname varchar(150),saddr varchar(255),stele varchar(255),semail varchar(255));
CREATE TABLE course(cid varchar(100) PRIMARY KEY NOT NULL, ctitle varchar(255));
CREATE TABLE staff( stid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  stname varchar(255), staddr varchar(255),  sttele varchar(255), stemail varchar(255));
CREATE TABLE users( uid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  upwd varchar(255), utype varchar(255),   uemail varchar(255));
CREATE TABLE enroll(eid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  uid int,  cid varchar(100),  etype varchar(255), FOREIGN KEY (uid) REFERENCES users(uid), FOREIGN KEY (cid) REFERENCES course(cid));
CREATE TABLE grades( eid int PRIMARY KEY NOT NULL,   grade int);
CREATE TABLE section(seid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  cid varchar(100),  secname varchar(255), FOREIGN KEY (cid) REFERENCES course(cid));
CREATE TABLE sectionitem(ssid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  seid int,  uid int,  content varchar(255), ssdatecreated datetime, FOREIGN KEY (seid) REFERENCES section(seid),  FOREIGN KEY (uid) REFERENCES users(uid));
CREATE TABLE discussionforum(fid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  cid varchar(100),  fname varchar(255),  fdatecreated datetime,  fthreadamt int, FOREIGN KEY (cid) REFERENCES course(cid));
CREATE TABLE discussionthread(tid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  fid int,   cid varchar(100),  uid int,  tname varchar(255),  tdatecreated datetime,   treplyamount int,FOREIGN KEY (cid) REFERENCES course(cid),FOREIGN KEY (fid) REFERENCES discussionforum(fid),FOREIGN KEY (uid) REFERENCES users(uid));
CREATE TABLE reply(rid int PRIMARY KEY NOT NULL AUTO_INCREMENT,  tid int,  fid int,  cid varchar(100),  uid int,  rname varchar(255),  rdatecreated datetime,  rreplyamount int,FOREIGN KEY (cid) REFERENCES course(cid),FOREIGN KEY (fid) REFERENCES discussionforum(fid),FOREIGN KEY (tid) REFERENCES discussionthread(tid));
CREATE TABLE assignment(aid int PRIMARY KEY NOT NULL AUTO_INCREMENT, sid int,cid varchar(100),aname varchar(255), agrade int, adatesubmitted datetime,FOREIGN KEY (cid) REFERENCES course(cid), FOREIGN KEY (sid) REFERENCES student(sid));
CREATE TABLE event(evid int primary key NOT NULL AUTO_INCREMENT, cid varchar(100), uid int, ename varchar(255), edatecreated datetime, edateofevent datetime, FOREIGN KEY (cid) REFERENCES course(cid));

SELECT uid, COUNT(*) AS num_courses
FROM enroll
GROUP BY uid
HAVING num_courses > 6;

SELECT s.sname, e.uid, COUNT(*) AS num_courses
FROM enroll e
JOIN student s ON s.sid = e.uid
GROUP BY e.uid
HAVING num_courses < 3;

SELECT enroll.cid, COUNT(*) AS num_students
FROM enroll
GROUP BY enroll.cid
HAVING num_students < 10;

SELECT staff.stid, staff.stname, COUNT(*) AS num_courses
FROM staff
JOIN enroll ON staff.stid = enroll.uid
GROUP BY staff.stid, staff.stname
HAVING num_courses > 5;

SELECT staff.stid, staff.stname, COUNT(*) AS num_courses
FROM staff
JOIN enroll ON staff.stid = enroll.uid
GROUP BY staff.stid, staff.stname
HAVING num_courses = 0;


SELECT staff.stid, staff.stname, COUNT(*) AS num_courses
FROM staff
JOIN enroll ON staff.stid = enroll.uid
WHERE enroll.etype = 'Lecturer'
GROUP BY staff.stid, staff.stname
HAVING num_courses < 1;


