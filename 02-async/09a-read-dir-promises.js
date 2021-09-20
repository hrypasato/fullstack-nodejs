const fs = require('fs').promises

fs.readdir('./')
    .catch(err => console.error(err))
    .then(filesList =>{
        Promise.all(
            filesList.map(
                file => fs.readFile(file).then(data => [file, data.length])
            )
        )
        .then(results => {
            results.forEach(
                ([file, length]) => console.log(`${file}: ${length}`)
            )
            console.log('done!')
        })
    })