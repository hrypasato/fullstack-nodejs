const Products = require('./products')
const autoCatch = require('./lib/auto-catch')

module.exports = autoCatch({
    createProduct,
    editProduct,
    deleteProduct,
    getProduct,
    listProducts
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