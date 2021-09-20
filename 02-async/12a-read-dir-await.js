const fs = require('fs').promises

printLengths('./')

async function printLengths(dir){
    const fileList = await fs.readdir(dir)
    const results = await Promise.all(
        fileList.map(
            file => fs.readFile(file).then(data => [file, data.length])
        ) 
    )

    results.forEach(result => console.log(`${result[0]}: ${result[1]}`))
    console.log('done!')
}