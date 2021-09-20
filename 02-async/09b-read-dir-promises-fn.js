const path = require('path')
const fs = require('fs').promises
const targetDirectory = process.argv[2] || './'

function getFileLenght(filePath){
    return fs.readFile(filePath)
                .then(data => [filePath, data.length])
                .catch(err => {
                    if(err.code === 'EISDIR') return [filePath, 0]
                    throw err
                })
}

function getFileLengths(dir){
    return fs.readdir(dir).then(fileList => {
        const readFiles = fileList.map(file =>{
            const filePath = path.join(dir, file)
            return getFileLenght(filePath)
        })
        return Promise.all(readFiles)
    })
}

getFileLengths(targetDirectory)
    .catch(err => console.log(err))
    .then(results =>{
        results.forEach(([file, length]) => {
            console.log(`${file}: ${length}`)
        });
        console.log('done!')
    })