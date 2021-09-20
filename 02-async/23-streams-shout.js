const fs = require('fs')
const { Transform } = require('stream')

function shout() {
    return new Transform({
        transform(chunk, encoding, callback){
            callback(null, chunk.toString().toUpperCase())
        }
    })
}

fs.createReadStream('23-streams-shout.js')
    .pipe(shout())
    .pipe(fs.createWriteStream('loud-code.txt'))

