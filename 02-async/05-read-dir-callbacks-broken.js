const fs = require('fs')

const directoryPath = './'

fs.readdir(directoryPath, (err, fileList)=>{
    if(err) return console.error(err)
    console.log(fileList)
    fileList.forEach((file) => {
        fs.readFile(file,(err, fileData)=>{
            if(err) return console.error(err)
            console.log(`${file} : ${fileData.length}`)
        })
    })

    console.log('done!')
})