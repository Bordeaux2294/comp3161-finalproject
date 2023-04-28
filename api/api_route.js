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
        const query = `SELECT * FROM course`;
        connection.query(query, (err, rows) => {
            if (err) throw err;
            console.log('Courses retrieved');
            res.send(rows);
        });
    } catch(err){
        console.log(err);
    }
})

router.get('/get_student_course/:uid', (req, res) => {
    const uid = req.params.uid;
    const query = `SELECT * FROM enroll WHERE uid = '${uid}'`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        const courses = results.map((result) => {
            return result.cid;
        });
        res.json({ uid: uid, courses: courses });
    });
});

router.get('/get_lecturer_course/:uid', (req, res) => {
    const uid = req.params.uid;
    const query = `SELECT * FROM enroll WHERE uid = '${uid}'`;
    connection.query(query, (error, results) => {
        if (error) throw error;
        const courses = results.map((result) => {
            return result.cid;
        });
        res.json({ uid: uid, courses: courses });
    });
});

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
        
        const courseID = req.params.id
        const values = [courseID]
        const queryStatement = `SELECT student.sname from enroll JOIN student ON enroll.uid = student.sid where cid=?;`
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
    
        
       } catch (error) {
            console.log(error);
            res.status(500).send()
       }
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

router.get('/get_forums/:id', (req, res) => {
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


router.post('/create_forum/:cid/:fname', (req, res) => {
    const cid = req.params.cid;
    const fname = req.params.fname;
    const fthreadamt = 0;
    const values = [cid,fname,fthreadamt]
    const queryStatement = "INSERT INTO discussionforum (cid,fname,fdatecreated,fthreadamt) values (?,?,NOW(),?)"
    connection.query(queryStatement,values, (err,results) => {
        if (err) throw err;
        res.status(200).send("Forum created successfully")})

})

router.post('/create_section/:cid/:secname', (req, res) => {
    const cid = req.params.cid;
    const secname = req.params.secname;
    const values = [cid,secname]
    const querystatement = "INSERT INTO section (cid,secname) values (?,?)"
    connection.query(querystatement,values, (err,results) => {
        if (err) throw err;
        res.status(200).send("Section created successfully")})

})

router.post('/create_section_item/:seid/:uid/:content', (req, res) => {
    const seid = req.params.seid;
    const uid = req.params.uid;
    const content = req.params.content;
    const values = [seid, uid, content]
    const querystatement = "INSERT INTO sectionitem (seid,uid,content,ssdatecreated) values (?,?,?, NOW())"
    connection.query(querystatement,values, (err,results) => {
        if (err) throw err;
        res.status(200).send("SectionItem created successfully")})

})

router.get('/get_courseitems/:courseid', (req, res) => {
    const courseID = req.params.courseid
    const values = [courseID]
    const queryStatement = "`select sectionitem.content from sectionitem inner join section on sectionitem.seid = section.seid where section.cid=?"
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
