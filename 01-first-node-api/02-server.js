const http = require('http')

const port = 1337

const server = http.createServer(function(req, res){
	res.setHeader('Content-Type', 'application/json')
	res.end(JSON.stringify({text:'hi', numbers:[1,2,3]}))	
})

server.listen(port)
console.log(`Server listening on port ${port}`)
