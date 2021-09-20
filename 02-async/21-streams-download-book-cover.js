const fs = require('fs')
const https = require('https')

const fileUrl = 'https://www.newline.co/fullstack-react/assets/images/fullstack-react-hero-book.png'

https.get(fileUrl, res =>{
    res.pipe(fs.createWriteStream('book.png'))
    .on('finish', ()=> console.log('file saved'))
})