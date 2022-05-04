const path = require('path')
const express = require('express');
const { rmSync } = require('fs')
const router = express.Router()
const fs = require('fs')
const mysql = require('mysql');
const session = require('express-session');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'accounts'
});

router.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(express.static(path.join(__dirname + 'static')))

router.get('/', (req, res) => {
    const loginFile = path.join(__dirname + '/../webPage/login.html');
    res.sendFile(loginFile);
});

router.post('/auth', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username && password) {
        connection.query('SELECT * FROM accounts WHERE username = ? AND password = ?', [username, password], function (error, results, fields) {
            if (error) throw error;

            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect('/home');
            } else {
                res.send('Incorrect')
            }
            res.end();
        });
    } else {
        res.send('Please Enter name and password')
        res.end();
    }
});

router.get('/home', (req, res) => {
    if (req.session.loggedin) {
        const Webpage = path.join(__dirname, '../webPage/index.html')
        res.sendFile(Webpage)
        
    } else {
        res.send(`<h1>Please login to view this page!</h1>`)
    }
});

//อ้างอิงตำเเหน่งไฟล์

const coursePage = path.join(__dirname, '../webPage/about.html')


router.get('/about', (req, res) => {
    
    res.sendFile(coursePage)
})
router.get('/course/:id', async (req, res) => {

    // ใช้วิธีการสร้างตำเเหนงไฟล์ขึ้นมา
    //อ้างอิง https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
    const courseID = req.params.id; //รับค่า id จาก url
    const fileName = '../webPage/course' + courseID + '.html'; //สร้างชื่อ เเละตำเเหน่งไฟล์ขึ้นมา
    const localFile = path.join(__dirname, fileName); //กำหนดตำเเหน่งไฟล์ HTML

    fs.readFile(localFile, (err) => { //ตรวจสอบว่ามีไฟล์ หรือไม่มี
        if(err) {
            console.log(`${err}`) 
            res.redirect('/course')
        }
        else{
            res.sendFile(localFile);
            console.log(`Local_file : ${localFile}; ID: ${courseID}`)
        }
    })
})

router.get('/course', (req, res)=>{
    res.sendFile(path.join(__dirname, '../webPage/course.html'))
})
module.exports = router