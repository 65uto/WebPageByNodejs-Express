/*
//Server JS
const http = require('http')
const fs = require('fs')
const url = require('url')

const indexPage = fs.readFileSync(`${__dirname}/webPage/index.html`)
const aboutPage = fs.readFileSync(`${__dirname}/webPage/about.html`)


const server = http.createServer(function(req,res){
    
    console.log(url.parse(req.url,true))
    const {pathname, query} = url.parse(req.url, true)
    console.log("url = ",pathname)
    if(pathname =="/" || pathname == "/home"){
       // const myHtml = `
       // <h1 style="color:blue">Home<\h1>
       // <h1>GoodBye</h1>
       // <p style="color:green">Goodmoring</p>
       // <h2 style:"color:yellow"><i>Wellcome evryone to my website</i></h2>
        //`
        res.end(indexPage)
    }
    else if(pathname == "/about"){
        res.end(aboutPage)
    }
    else if(pathname =="/course"){
        console.log(query.id);
    }
    else{
        res.writeHead(404)
        res.end("<h1>NOT FOUND</h1>")
    }

});
server.listen(3000)
console.log(0)
*/


//Server Express
/*
// Basic Routing
const url = require('url')
const express = require('express')
const app = express()
const path = require('path')

//อ้างอิงตำเเหน่งไฟล์
const Webpage = path.join(__dirname,'webPage/index.html')

app.get('/',(req,res)=>{
    res.status(200)
    res.type('text/html')
    res.sendFile(Webpage)
})
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname,'webPage/about.html'))
})
app.listen(8000,()=>{
    console.log('Run server in port 8000')
})
*/

// Class Router
const express = require('express')
const app = express()

const router = require('./routes/myRouter')
const login = require('./nodeLogin/login')
app.use(router)

app.listen(8000, () => {
    console.log('Run server in port 8000 ')
})