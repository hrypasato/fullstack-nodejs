require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const passport = require('passport')
const Strategy = require('passport-local').Strategy
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')

const api = require('./api')
const middleware = require('./middleware')

const port = process.env.PORT
const sessionSecret = process.env.SESSION_SECRET
const adminPassword = process.env.ADMIN_PASSWORD

passport.use(new Strategy(function(username, password, cb) {
    const isAdmin = (username === 'admin') && (password === adminPassword)
    if(isAdmin) cb(null, {username:'admin'})

    cb(null,false)
    })
)

passport.serializeUser((user,cb) => cb(null, user))
passport.deserializeUser((user,cb) => cb(null, user))

const app = express()

app.use(middleware.cors)
app.use(bodyParser.json())
app.use(cookieParser())
app.use(expressSession({
    secret:sessionSecret,
    resave:false,
    saveUninitialized:false
}))
app.use(passport.initialize())
app.use(passport.session())

app.post('/login', passport.authenticate('local'), (req, res) => res.json({success:true}))

app.get('/products', api.listProducts)
app.get('/products/:id', api.getProduct)
app.post('/products', ensureAdmin, api.createProduct)
app.put('/products/:id', ensureAdmin, api.editProduct)
app.delete('/products/:id', ensureAdmin, api.deleteProduct)

app.get('/orders',ensureAdmin, api.listOrders)
app.get('/orders/:id', api.getOrder)
app.post('/orders', ensureAdmin, api.createOrder)

app.use(middleware.handleError)
app.use(middleware.notFound)

function ensureAdmin(req, res, next){
    const isAdmin = req.user && req.user.username === 'admin'
    if(isAdmin) return next()

    res.status(401).json({error:'Unauthorized'})
}

const server = app.listen(port, ()=> console.log(`Server listening on port ${port}`))