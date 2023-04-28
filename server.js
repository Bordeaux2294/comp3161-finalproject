const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const apiRouter = require('./api/api_route');
const { faker } = require('@faker-js/faker');

require('dotenv/config')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'school'
  });

  app.post('/register/:uid/:upwd/:utype/:uemail', (req, res) => {
    const uid = req.params.uid;
    const upwd = req.params.upwd;
    const utype = req.params.utype;
    const uemail = req.params.uemail;
    const query = 'INSERT INTO users (uid, upwd, utype, uemail) VALUES (?, ?, ?, ?)';
    connection.query(query, [uid, upwd, utype, uemail], (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).send('Error inserting data');
          } else {
            console.log(`Inserted user ${uemail} into database`);
            res.json({ message: 'User registered successfully' });
          }
        });
      });

app.get('/', (req, res) => {
    res.send("If you are seeing this then you have started the server successfully!")
})

app.post('/login_user/:uid/:upwd', (req, res) => {
  const uid = req.params.uid;
  const upwd = req.params.upwd;
  const query = 'SELECT uid, upwd FROM users WHERE uid = ? AND upwd = ?';
  connection.query(query, [uid, upwd], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching data');
    } else {
      if (result.length > 0) {
        console.log(`Login successful for uid ${uid}`);
        res.json({ message: 'Login successful' });
      } else {
        console.log(`Invalid credentials for uid ${uid}`);
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  });
});

app.listen(process.env.PORT, ()=>{
    console.log('listening on port '+process.env.PORT);
})
