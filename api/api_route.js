const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql')
require('dotenv/config')

const router = express.Router();

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: process.env.PASSWORD,
    database:'school',
    multipleStatements:true
});


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
    // register for courses
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

router.get('/get_calendar_events/:id', (req, res) => {
    // get all calender events for a specific course
    try {
        const connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database:'school',
            multipleStatements:true
        });
        
        connection.connect((err) => {
            if(err){
                throw err;
            }else{
                console.log("Connection successful!")
            }
        })
        const courseID = req.params.id
        
        const values = [courseID]
        const queryStatement = `SELECT * FROM event WHERE cid=?;`
        connection.query(queryStatement, values, (error, results, fields)=> {
            if(error){
                throw error;
            }
            let responseLst = []
            for(let index = 0; index < results.length; index++){
                responseLst.push(results[index])
            }

            res.status(200).send(results)
        })
    
        connection.end((err) => {
            if(err){
                throw err;
            }
            console.log("Connection closed successfully!")
        })
        
       } catch (error) {
            console.log(error);
            res.status(500).send()
       }
})

router.get('/get_student_calendar_events/:studentID/:date', (req, res) => {
    try {     
        connection.connect((err) => {
            if(err){
                throw err;
            }else{
                console.log("Connection successful!")
            }
        })
        const studentID = req.params.studentID;
        const date = req.params.date;
        const values = [studentID, date]
        const queryStatement = `SELECT * FROM event WHERE uid=? AND edateofevent=?;`
        connection.query(queryStatement, values, (error, results, fields)=> {
            if(error){
                throw error;
            }
    
            res.status(200).send(results)
        })
    
        connection.end((err) => {
            if(err){
                throw err;
            }
            console.log("Connection closed successfully!")
        })

       } catch (error) {
            console.log(error);
            res.status(500).send()
       }
})

var counter = 1
router.post('/create_calendar_events', (req, res) => {
   try {

    connection.connect((err) => {
        if(err){
            throw err;
        }else{
            console.log("Connection successful!")
        }
    })
    const courseID = req.body.courseID
    const userID = req.body.userID
    const eventName = req.body.eventName
    const eventDate = req.body.eventDate
    const values = [counter, courseID, userID, eventName, eventDate]
    const queryStatement = `INSERT INTO event (evid, cid, uid, ename, edatecreated, edateofevent) VALUES(?, ?, ?, ?, NOW(), ?);`
    connection.query(queryStatement, values, (error, results, fields)=> {
        if(error){
            throw error;
        }

        console.log("Record inserted successfully!")
    })

    connection.end((err) => {
        if(err){
            throw err;
        }
        console.log("Connection closed successfully!")
    })

    console.log(req.body)
    
    res.status(200).send("Calendar event created successfully!");
    counter = counter + 1
   } catch (error) {
        console.log(error);
        res.status(500).send()
   }
})

router.get('/get_forums:id', (req, res) => {
    const cid = req.params.id;
    res.send("Forum for course ", cid," retrieved");
})

router.post('/create_forum', (req, res) => {
    const cid = req.body.id;
    res.send("Forum created");
})

router.get('/get_disc_thread/:id', (req, res) => {
    const fid = req.params.id;
    query = `SELECT * FROM discussionthread WHERE fid = ${fid}`
    connection.query(query, (err, result) => {
        if (err) throw err;
        const thread = result[0]
        console.log(thread)
        res.send(thread)
    })
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
        const fid = req.body.fid
        const cid = req.body.cid
        const uid = req.body.uid
        const rname = req.body.rname
        const parent_rid = req.body.parent_rid
        const date = new Date().toISOString().slice(0, 19).replace('T', ' ')
        const rreplyamount = 0
        
        // Insert the new reply into the 'reply' table, with the appropriate parent_id if a parent reply exists.
        let query
        if (parent_rid){
            query = `INSERT INTO reply (tid, fid, cid, uid, rname, rdatecreated, rreplyamount, parent_rid) VALUES (${tid}, ${fid}, '${cid}', ${uid}, "${rname}", '${date}', ${rreplyamount}, ${parent_rid})`;
        }else{
            query = `INSERT INTO reply (tid, fid, cid, uid, rname, rdatecreated, rreplyamount) VALUES (${tid}, ${fid}, '${cid}', ${uid}, "${rname}", '${date}', ${rreplyamount})`;
        }
        // Execute the SQL query
        connection.query(query, (err) => {
            if (err) throw err;
            res.send('Reply has been made ');
        });
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

router.post('/submit_grade', (req, res) => {
    const uid = req.body.uid;
    const aid = req.body.aid;
    const grade = req.body.grade;
  
    const updateAssignmentQuery = `UPDATE assignment SET agrade = ${grade} WHERE aid = ${aid} AND sid = ${uid}`;
  
    connection.query(updateAssignmentQuery, (err) => {
      if (err) {
        throw err;
      }
        const getGradesQuery = `SELECT AVG(agrade) as average FROM assignment WHERE sid = ${uid} AND cid = (SELECT cid FROM assignment WHERE aid = ${aid})`;
  
        connection.query(getGradesQuery, (err, result) => {
          if (err) throw err;
          const avg = result[0].average
          const empty = `SELECT count(*) as size FROM grades WHERE eid = (SELECT eid FROM enroll WHERE uid = ${uid} AND cid = (SELECT cid FROM assignment WHERE aid = ${aid}))`
          connection.query(empty, (err, result) => {
            if (err) throw err;
            let query2
            if (result[0].size === 0){
                query2 = `INSERT INTO grades (eid, grade) SELECT eid, ${avg} FROM enroll WHERE uid = ${uid} AND cid = (SELECT cid FROM assignment WHERE aid = ${aid})`;
            }else{
                query2 = `UPDATE grades SET grade = ${avg} WHERE eid = (SELECT eid  FROM enroll WHERE uid = ${uid} AND cid = (SELECT cid FROM assignment WHERE aid = ${aid}))`; 
            }
            connection.query(query2, (err)=>{
                if (err) throw err;
                res.send("Grade has been updated successfully")
            })
          })
        });
    });
});
  

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
    WHERE semail IN (
        SELECT uemail
        FROM users
        WHERE uid IN (
            SELECT uid
            FROM enroll
            WHERE etype = 'Student'
            GROUP BY uid
            HAVING COUNT(DISTINCT cid) >= 3
        )
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
    WHERE stemail IN (
        SELECT uemail
        FROM users
        WHERE uid IN (
            SELECT uid
            FROM enroll
            WHERE etype = 'Lecturer'
            GROUP BY uid
            HAVING COUNT(DISTINCT cid) >= 3
        )
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
    SELECT sid, sname, grade AS avg_grade
    FROM grades
    JOIN enroll ON grades.eid = enroll.eid
    JOIN users ON enroll.uid = users.uid
    JOIN student ON users.uemail = student.semail
    ORDER BY avg_grade DESC
    LIMIT 10
    `
    connection.query(query, (err)=>{
        if (err) throw err;
        res.send("View created successfully")
    })
})







module.exports = router;
