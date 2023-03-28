

const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const mysql = require('mysql');
const apiRouter = require('./api/api_route')
require('dotenv/config')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

app.post('/register', async (req, res) => {
    try{    
        const userid = req.body.userid
        const password = req.body.password
        const accountType = req.body.type
        const saltRounds = 10
        const hash = await bcrypt.hash(password, saltRounds);
        console.log(userid, ", HashedPassword: ", hash, ", ",accountType);
        res.send("Registered successfully");
    } catch(err){
        console.log(err);
    }
})

app.post('/login', (req, res) => {
    const userid = req.body.userid
    const password = req.body.password
    let query;//Query to get user password
    let result;
    //bcrypt.compare(password, results) ? res.send("Logged in successfully") : res.send("Password mismatch")
    console.log('login: ',userid, ", ",password);
    res.send("Logged in successfully");
})

app.listen(process.env.PORT, ()=>{
    console.log('listening on port '+process.env.PORT);
})