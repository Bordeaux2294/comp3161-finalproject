const express = require('express');
const bodyParser = require('body-parser');
require('dotenv/config')

const router = express.Router();


//Endpoint #1
router.post('/create_course', (req, res) => {
    const accountType = req.body.type;
    const cname = req.body.cname
    const lid = req.body.lid
    accountType === "admin" ? res.send(`${cname} Course created for ${lid}`) : res.send("Access not granted");
})

router.get('/get_courses', (req, res) => {
    res.send("Courses retrieved");
})

router.get('/get_student_course:id', (req, res) => {
    const sid = req.params.id;
    res.send(`Student courses retrieved for student with id number#${sid}`);
})

router.get('/get_teacher_course:id', (req, res) => {
    const tid = req.params.id;
    res.send("Teacher courses retrieved");
})

router.post('/enrol', (req, res) => {
    const sid = req.body.sid;
    const cid = req.body.cid;
    const grade = 0;
    res.send("Enrolled in course")
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
    const title = req.body.title
    const creator = req.body.creator
    const content = req.body.content
    const date = new Date(Date.now())
    const fid = req.body.fid //forum id
    res.send(`Discussion thread created for ${creator} about ${title} on ${date}`)
})

router.post('/create_reply', (req, res) => {
    const tid = req.body.tid //thread id
    const author = req.body.author
    const date = new Date(Date.now())
    const content = req.body.content
    res.send(`Reply made for ${author} on ${date}`)
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