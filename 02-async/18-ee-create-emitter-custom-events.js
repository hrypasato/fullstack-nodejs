const http = require('http')
const { EventEmitter } = require("stream");

function createEventSource(url){
    const source = new EventEmitter()

    http.get(url, res =>{
        res.on('data', data =>{
            const message = data.toString()
                                .replace(/^data:/,'')
                                .replace(/\n\n$/,'')
            source.emit('message', message)

            const evenType = message.includes('?') ? 'question': 'statement'
            source.emit(evenType,message)

        })
    })
    return source
}

const source = createEventSource('http://localhost:1337/sse')
// source.on('message', console.log) //listening statements and questions
//source.on('statement', console.log) //listening only statements
source.on('question', q => console.log(`Someone asked, "${q}"`)) //listening only questions