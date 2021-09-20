const fs = require('fs')
const path = require('path')

const targerDirectory= process.argv[2] || './'

function mapAsync(arr, fn, onFinish){
    let prevError
    let nRemaining = arr.length
    const results = []

    arr.forEach((item, i) => {
        fn(item, function(err, data){
            if(prevError) return

            if(err){
                prevError = err
                return onFinish(err)
            }

            results[i] = data
            nRemaining--
            if(!nRemaining) onFinish(null, results)
        })
        
    });
}

function readFile(file, cb){
    fs.readFile(file, function(err, fileData){
        if(err){
            if(err.code === 'EISDIR') return cb(null, [file, 0])
            return cb(err)
        }
        cb(null, [file, fileData.length])
    })
}

function getFileLengths(dir, cb){
    fs.readdir(dir,(err, files) =>{
        if(err) return cb(err)
        const filePaths = files.map(file => path.join(dir, file))
        mapAsync(filePaths, readFile, cb)
    })
}

getFileLengths(targerDirectory, function(err, results){
    if(err) return console.err(err)

    results.forEach(
        ([file, length]) => console.log(`${file}: ${length}`)
    );

    console.log('done!')
})