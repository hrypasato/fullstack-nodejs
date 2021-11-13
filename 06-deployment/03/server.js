require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const api = require('./api')
const auth = require('./auth')
const middleware = require('./middleware')

const port = process.env.PORT

const app = express()

app.use(middleware.cors)
app.use(bodyParser.json())
app.use(cookieParser())

app.post('/login', auth.authenticate, auth.login)
app.post('/users', api.createUser)

app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', auth.ensureUser, api.createProduct)
app.put('/products/:id', auth.ensureUser, api.editProduct)
app.delete('/products/:id', auth.ensureUser, api.deleteProduct)

app.get('/orders', auth.ensureUser, api.listOrders)
app.get('/orders/:id', auth.ensureUser, api.getOrder)
app.post('/orders', auth.ensureUser, api.createOrder)

app.get('/health', api.checkHealth)

app.use(middleware.handleError)
app.use(middleware.notFound)

const server = app.listen(port, ()=> console.log(`Server listening on port ${port}`))