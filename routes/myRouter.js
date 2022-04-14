const path = require('path')
const express = require('express')
const { rmSync } = require('fs')
const app = express()
const router = express.Router()
const fs = require('fs')

//อ้างอิงตำเเหน่งไฟล์
const Webpage = path.join(__dirname, '../webPage/index.html')
const coursePage = path.join(__dirname, '../webPage/about.html')

router.get('/', (req, res) => {
    res.status(200)
    res.type('text/html')
    res.sendFile(Webpage)
})
router.get('/about', (req, res) => {
    
    res.sendFile(coursePage)
})
router.get('/course/:id', async (req, res) => {

    // ใช้วิธีการสร้างตำเเหนงไฟล์ขึ้นมา
    //อ้างอิง https://stackoverflow.com/questions/10049557/reading-all-files-in-a-directory-store-them-in-objects-and-send-the-object
    const courseID = req.params.id;
    const fileName = '../webPage/course' + courseID + '.html';
    const localFile = path.join(__dirname, fileName);

    fs.readFile(localFile, (err) => {
        if(err) {
            console.log(`Error : ${err}`) 
            res.redirect('/')
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