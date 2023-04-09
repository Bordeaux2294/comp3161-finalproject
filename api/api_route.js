const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
require('dotenv/config')

const router = express.Router();

const connection = mysql.createConnection({
    multipleStatements: true,
    user: 'root',
    host: 'localhost',
    password: process.env.PASSWORD,
    database: 'school'
})


//Endpoint #1
router.post('/create_course', (req, res) => {
    try {
        const accountType = req.body.type;
        const cname = req.body.cname
        const lid = req.body.lid
        accountType === "admin" ? res.send(`${cname} Course created for ${lid}`) : res.send("Access not granted");
    } catch(err){
        console.log(err);
    }
})

router.get('/get_courses', (req, res) => {
    try{
        res.send("Courses retrieved");
    } catch(err){
        console.log(err);
    }
})

router.get('/get_student_course:id', (req, res) => {
    try {
        const sid = req.params.id;
        res.send(`Student courses retrieved for student with id number#${sid}`);
    } catch(err){
        console.log(err);
    }
})

router.get('/get_teacher_course:id', (req, res) => {
    const tid = req.params.id;
    res.send("Teacher courses retrieved");
})

router.post('/enrol', (req, res) => {
    try{   
        const sid = req.body.sid;
        const cid = req.body.cid;
        const grade = 0;
        res.send("Enrolled in course")
    } catch(err){
        console.log(err)
    }
})

router.get('/get_members:id', (req, res) => {
    const cid = req.params.id;
    res.send("Members found");
})

router.get('/get_calendar_events:id', (req, res) => {
    const ceid = req.params.id;
    res.send("Calendar events retrieved")
})

router.get('/get_student_calendar_events', (req, res) => {
    const sid = req.body.id;
    const date = req.body.date;
    res.send("Calendar events found for sid: ", sid, " on date: ", date);
})

router.post('/create_calendar_events', (req, res) => {
    const cid = req.body.id;
    res.send("Calendar events created for sid: ", cid);
})

router.get('/get_forums:id', (req, res) => {
    const cid = req.params.id;
    res.send("Forum for course ", cid," retrieved");
})

router.post('/create_forum', (req, res) => {
    const cid = req.body.id;
    res.send("Forum created");
})

router.get('/get_disc_thread:id', (req, res) => {
    const cid = req.params.id;
    res.send("Discussion thread created");
})

router.post('/create_disc_thread', (req, res) => {
    try {   
      const fid = req.body.fid //forum id
      const cid = req.body.cid
      const uid = req.body.uid
      const tname = req.body.tname
      const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
      const replyamount = 0
      const size = 'SELECT COUNT(*) as size FROM discussionthread'
      connection.query(size, (err, result) => {
        if (err) throw err;
        let size = result[0].size + 1
        const query = `INSERT INTO discussionthread (tid, fid, cid, uid, tname, tdatecreated, treplyamount) 
        VALUES (${size}, ${fid}, '${cid}', ${uid}, '${tname}', '${date}', ${replyamount})`
    
        connection.query(query, (err) => {
          if (err) throw err;
          res.send("Discussion thread created successfully");
        })
      })
    } catch (err) {
      console.log(err)
    }
  })
  

router.post('/create_reply', (req, res) => {
    try{   
        const tid = req.body.tid //thread id
        const author = req.body.author
        const date = new Date(Date.now())
        const content = req.body.content
        res.send(`Reply made for ${author} on ${date}`)
    } catch(err){
        console.log(err)
    }
})

router.post('/create_course_content', (req, res) => {
    const cid = req.body.cid
    const content = req.body.content
    req.send('Course content created')
})

router.get('/retrieve_course_content:id', (req, res) => {
    const cid = req.params.id
    res.send('Course content retrieved')
})

router.post('/submit_assignment', (req, res) => {
    const sid = req.body.sid
    const cid = req.body.cid // course id
    const aname = req.body.aname
    const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
    connection.query('SELECT COUNT(*) as size FROM assignment', (err, result) => {
      if (err) throw err;
      let size = result[0].size + 1
      let sub = 'INSERT INTO assignment (aid, sid, cid, aname, agrade, adatesubmitted) VALUES '
      sub += `(${size}, ${sid}, '${cid}', '${aname}', 0, '${date}')`
      connection.query(sub, (err) => {
        if (err) throw err;
        res.send("Assignment submitted successfully");
      })
    })
})

router.put('/grade_assignment', (req, res) => {
    const uid = req.body.uid
    const aid = req.body.aid
    const grade = req.body.grade
    let mark = `UPDATE assignment SET agrade = ${grade} WHERE aid = ${aid} AND sid = ${uid}`
    connection.query(mark, (err) => {
        if (err) throw err;
        let length = `SELECT COUNT(*) as amount FROM assignment WHERE sid = ${uid} AND cid=(SELECT cid FROM assignment WHERE aid = ${aid})`
        connection.query(length, (err, result) => {
            if (err) throw err;
            let size = result[0].amount;
            let query = `SELECT grade
                FROM grades
                JOIN enroll ON enroll.eid = grades.eid
                WHERE enroll.uid = ${uid} AND enroll.cid = (SELECT cid FROM assignment WHERE aid = ${aid})`
            connection.query(query, (err, result) => {
                if (err) throw err;
                console.log(result)
                let ngrade = (result + grade)/size
                let query2 = `UPDATE grades SET grade = ${ngrade} WHERE eid = (SELECT eid FROM enroll WHERE uid=${uid})`
                connection.query(query2, (err, result) => {
                    if (err) throw err;
                    res.send("Grade updated")
                })
            })
        })
    })
})

router.get('/fifty_students', (req, res) => {
    const query = `
        CREATE VIEW fifty_students AS
        SELECT cid, ctitle
        FROM course
        WHERE cid IN (
            SELECT cid
            FROM enroll
            GROUP BY cid
            HAVING COUNT(DISTINCT uid) >= 50
                        )
                `
    connection.query(query, (err)=>{
        if (err) throw err;
        res.send("View created successfully")
    })
})

router.get('/five_or_more_courses', (req, res) => {
    const query = `
    CREATE VIEW five_or_more_courses AS
    SELECT sid, sname
    FROM student
    WHERE sid IN (
        SELECT uid
        FROM enroll
        GROUP BY uid
        HAVING COUNT(DISTINCT cid) >= 5
    )`
    connection.query(query, (err)=>{
        if (err) throw err;
        res.send("View created successfully")
    })
})

router.get('/three_or_more_courses', (req, res) => {
    const query= `
    CREATE VIEW three_or_more AS
    SELECT stid, stname
    FROM staff
    WHERE stid IN (
        SELECT uid
        FROM enroll
        WHERE etype = 'instructor'
        GROUP BY uid
        HAVING COUNT(DISTINCT cid) >= 3
    )`
    connection.query(query, (err)=>{
        if (err) throw err;
        res.send("View created successfully")
    })
})

router.get('/most_enrolled', (req, res) => {
    const query = `
    CREATE VIEW most_enrolled AS
    SELECT course.cid, COUNT(*) as enrollment_count
    FROM enroll
    JOIN course ON enroll.cid = course.cid
    GROUP BY enroll.cid
    ORDER BY enrollment_count DESC
    LIMIT 10;    
    `
    connection.query(query, (err)=>{
        if (err) throw err;
        res.send("View created successfully")
    })
})

router.get('/highest_averages', (req, res) => {
    const query = `
    CREATE VIEW highest_average AS
    SELECT sid, sname, AVG(grade) AS avg_grade
    FROM grades
    JOIN enroll ON grades.eid = enroll.eid
    JOIN student ON enroll.uid = student.sid
    GROUP BY sid
    ORDER BY avg_grade DESC
    LIMIT 10
    `
    connection.query(query, (err)=>{
        if (err) throw err;
        res.send("View created successfully")
    })
})







module.exports = router;