/*
ClientID thanks to: https://codepen.io/chriscoyier/pen/vYOVZpj?editors=0010

JSON url
https://api.unsplash.com/photos/random/?count=10&client_id=8e31e45f4a0e8959d456ba2914723451b8262337f75bcea2e04ae535491df16d&query=products
*/

const fs = require('fs').promises
const path = require('path')
const express = require('express')

const port = process.env.PORT || 1337

const app = express()
app.get('/products', listProducts)
app.listen(port, ()=> console.log(`Server listening on port ${port}`))

async function listProducts(req, res){
    const productsFile = path.join(__dirname, '../products.json')
    try {
        const data = await fs.readFile(productsFile)
        res.json(JSON.parse(data))
    } catch (err) {
        res.status(500).json({error:err.message})
    }
}