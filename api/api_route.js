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
router.post('/create_course/:cid/:ctitle/:uid' ,(req,res) =>{
    try {   
        const cid = req.params.cid 
        const ctitle = req.params.ctitle
        const uid = req.params.uid
        const query1 = `select utype from users where uid=?`
           
          connection.query(query1,[uid], (err,results) => {
            if (err) throw err;
            console.log(results[0].utype);
            const tyype= results[0].utype;
            if (tyype == 'Admin'){
                const query = `INSERT INTO course (cid,ctitle) 
          VALUES ('${cid}', '${ctitle}')`
           
          connection.query(query, (err) => {
            if (err) throw err;
            res.send("course inserted successfully");
          })
            }else{
                res.send("User must be an admin to create course");
            }
          })
    
        
        
        
      } catch (err) {
        console.log(err)
      }
    })
 
router.post('/enroll_course_lec/:cid/:uid',(req,res) =>{
    const uid = req.params.uid;
    const cid = req.params.cid;
    const query1 = `SELECT count(eid) as size FROM enroll WHERE cid=? and etype='Lecturer'`;
    connection.query(query1, [cid], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
      } else {
        console.log(result);
        const sizes= result[0].size;
        if (sizes == 0) {
            const query = `INSERT INTO enroll (uid,cid,etype) 
            VALUES ('${uid}', '${cid}','Lecturer')`
             
            connection.query(query, (err) => {
              if (err) throw err;
              res.status(200).send("Lecturer registered successfully");
            })
        } else{
            console.log(`Course already has a lecturer`);
          res.status(401).send("One lecturer per course. Limit already exceeded");
        }
          
        
      }
    });
})


router.post('/enroll_course_stud/:cid/:uid',(req,res) =>{
    const uid = req.params.uid;
    const cid = req.params.cid;
    const query1 = `SELECT count(eid) as size FROM enroll WHERE uid=?`;
    connection.query(query1, [uid], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error fetching data');
      } else {
        console.log(result);
        const sizes= result[0].size;
        if (sizes <6) {
            const query = `INSERT INTO enroll (uid,cid,etype) 
            VALUES ('${uid}', '${cid}','Student')`
             
            connection.query(query, (err) => {
              if (err) throw err;
              res.status(200).send("Student registered successfully");
            })
        } else{
            console.log(`Student is already registered in max amount of courses [6]`);
          res.status(401).send("Max 6 courses per student. Limit already exceeded");
        }
          
        
      }
    });
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

router.get('/get_members/:id', (req, res) => {
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
        const queryStatement = `SELECT uid FROM enroll WHERE cid=?;`
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

router.get('/get_calendar_events:id', (req, res) => {
    // get calender events for a specific student
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
    try{   
        const title = req.body.title
        const creator = req.body.creator
        const content = req.body.content
        const date = new Date(Date.now())
        const fid = req.body.fid //forum id
        res.send(`Discussion thread created for ${creator} about ${title} on ${date}`)
    } catch(err){
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
    const cid = req.body.id // course id
    const aid = req.body.aid // assigment id
    const assignment = req.body.assignment
    res.send('Assignmnet submitted')
})

router.put('/grade_assignment ', (req, res) => {
    const uid = req.body.id;
    const grade = req.body.grade
    let query;//Query to update grade of assignment if the uid is the teacher for the course
    let query2;//Second query to add to the students average
    res.send("Grade updated");
})

router.get('/fifty_students', (req, res) => {
    res.send("Courses retrieved");
})

router.get('/five_or_more_courses', (req, res) => {
    res.send("Students retrieved");
})

router.get('/three_or_more_courses', (req, res) => {
    res.send("Courses retrieved");
})

router.get('/most_enrolled', (req, res) => {
    res.send("Courses retrieved");
})

router.get('/highest_averages', (req, res) => {
    res.send("Top 10 students retrieved");
})







module.exports = router;
