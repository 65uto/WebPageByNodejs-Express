const path = require('path')
const express = require('express')
const { rmSync } = require('fs')
const app = express()
const router = express.Router()

//อ้างอิงตำเเหน่งไฟล์
const Webpage = path.join(__dirname, '../webPage/index.html')
router.get('/', (req, res) => {
    res.status(200)
    res.type('text/html')
    res.sendFile(Webpage)
})
router.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, '../webPage/about.html'))
})
router.get('/course/:id', async (req, res) => {
    try {
        // ใช้วิธีการสร้างตำเเหนงไฟล์ขึ้นมา
        const courseID = req.params.id;
        const fileName = '../webPage/course' + courseID + '.html';
        const localFile = path.join(__dirname, fileName);
        res.sendFile(localFile);
        console.log(`Local_file : ${localFile}; ID: ${courseID}`)
    } catch (error) {
        console.log(`Error : ${error}`) 
    }

})

router.get('/course', (req, res)=>{
    res.sendFile(path.join(__dirname, '../webPage/course.html'))
})
module.exports = router