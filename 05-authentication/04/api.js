const Products = require('./models/products')
const Orders = require('./models/orders')
const autoCatch = require('./lib/auto-catch')
const Users = require('./models/users')

module.exports = autoCatch({
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    listProducts,
    getOrder,
    createOrder,
    listOrders,
    createUser
})

async function getProduct(req, res, next) {
    const { id } = req.params

    const product = await Products.get({ _id:id })
    if(!product) return next()

    res.json(product)
}

async function listProducts(req, res) {
    const { offset=0, limit=25, tag } = req.query

    res.json(await Products.list({
        offset:Number(offset),
        limit: Number(limit),
        tag
    }))
}

async function createProduct(req, res, next){
    const product = await Products.create(req.body)
    res.json(product)
}

async function editProduct(req, res, next){
    const change = req.body
    const product = await Products.edit(req.params.id, change)
    
    res.json(product)
}

async function deleteProduct(req, res, next){
    await Products.remove(req.params.id)
    res.json({success: true})
}

async function createOrder(req, res, next){
    const order = await Orders.create(req.body)
    res.json(order)
}

async function getOrder(req, res, next){
    const { id } = req.params

    const order = await Orders.get({_id : id})
    if(!order) return next()

    return res.json(order)
}

async function listOrders(req, res, next){
    const { offset=0, limit=25, productId, status } = req.query

    const orders = await Orders.list({
        offset:Number(offset),
        limit: Number(limit),
        productId,
        status
    })
    res.json(orders)
}

async function createUser(req, res, next){
    const user = await Users.create(req.body)
    const { username, email } = user
    res.json({ username, email })
}