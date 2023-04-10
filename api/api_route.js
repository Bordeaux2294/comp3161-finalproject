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
        const courseID = req.params.id
        
        const values = [courseID]
        const queryStatement = `SELECT * from discussionforum WHERE cid=?;`
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
    
})

router.post('/create_forum', (req, res) => {
    const cid = req.body.cid;
    const fid = req.body.fid;
    const fname = req.body.fname;
    const fthreadamt = 0;
    const values = [fid,cid,fname,fthreadamt]
    const queryStatement = "INSERT INTO discussionforum (fid,cid,fname,fdatecreate,fthreadamt) values (?,?,?,getdate(),?)"
    connection.query(querystatement,values, (err,results) => {
        if (err) throw err;
        res.status(200).send("Forum created successfully")})

})
router.post('/create_section', (req, res) => {
    const seid = req.body.seid;
    const cid = req.body.cid;
    const secname = req.body.secname;
    const values = [seid,cid,secname]
    const queryStatement = "INSERT INTO section (seid,cid,secname) values (?,?,?)"
    connection.query(querystatement,values, (err,results) => {
        if (err) throw err;
        res.status(200).send("Section created successfully")})

})
router.post('/create_sectionitem', (req, res) => {
    const ssid = req.body.ssid;
    const seid = req.body.seid;
    const uid = req.body.uid
    const values = [ssid,seid,uid]
    const queryStatement = "INSERT INTO sectionitem (ssid,seid,uid,ssdatecreated) values (?,?,?,getdate())"
    connection.query(querystatement,values, (err,results) => {
        if (err) throw err;
        res.status(200).send("Sectionitem created successfully")})

})
router.get('/get_courseitems/:courseid', (req, res) => {
    const courseID = req.params.courseid
    const values = [courseID]
    const queryStatement = "`select sectionitem.ssid from sectionitem inner join section on sectionitem.seid = section.seid where section.cid=?"
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
