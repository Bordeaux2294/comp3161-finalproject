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
