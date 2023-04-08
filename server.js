const express = require('express');
const bodyParser = require('body-parser');
// const bcrypt = require('bcrypt');
const mysql = require('mysql');
const apiRouter = require('./api/api_route');
const { faker } = require('@faker-js/faker');

require('dotenv/config')

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);

// app.post('/register', async (req, res) => {
//     try{    
//         const userid = req.body.userid
//         const password = req.body.password
//         const accountType = req.body.type
//         const saltRounds = 10
//         const hash = await bcrypt.hash(password, saltRounds);
//         console.log(userid, ", HashedPassword: ", hash, ", ",accountType);
//         res.send("Registered successfully");
//     } catch(err){
//         console.log(err);
//     }
// })

app.get('/', (req, res) => {
    res.send("If you are seeing this then you have started the server successfully!")
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
    // for(let i=0;i<20;i++){
    //     const first_name = faker.name.firstName();
    //     const last_name = faker.name.lastName();
    //     const email = faker.internet.email(first_name, last_name);
    //     const address = faker.address.streetAddress() + ", " + faker.address.cityName() + ", Jamaica";
    //     console.log(`First name: ${first_name} and last name: ${last_name} has an email
    //     of ${email} and lives in ${address}`);
    // }
})