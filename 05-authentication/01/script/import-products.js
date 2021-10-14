const db = require('../db.js')
const Products = require('../models/products')
const products = require('../../products-01.json')

;(async function(){
    for(let i=0; i<products.length; i++){
        console.log(await Products.create(products[i]))
    }
    db.disconnect()
})()