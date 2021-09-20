const fs = require('fs')

const directoryPath = './'

function mapAsync(arr, fn, onFinish){
    let prevError
    let nRemaining = arr.length
    const results = []

    arr.forEach((item, i) =>{
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
    })
}


fs.readdir(directoryPath, (err, fileList)=>{
    if(err) return console.error(err)

    mapAsync(fileList, fs.readFile, (err, results)=>{
        if(err) return console.error(err)
        results.forEach(
            (data,i) => console.log(`${fileList[i]}: ${data.length}`)
            )
    })

    console.log('done!')
})