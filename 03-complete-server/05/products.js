const fs = require('fs').promises
const path = require('path')

const productsFile = path.join(__dirname, '../products.json')

module.exports = {
    get,
    list
}

async function get(opts = {}) {
    const { id } = opts;
    const data = await fs.readFile(productsFile);

    return JSON.parse(data).find( item => item.id == id);
}

async function list(opts = {}) {
    const { offset=0, limit = 25, tag } = opts

    const data = await fs.readFile(productsFile)
    return JSON.parse(data)
            .filter((p,i) => !tag || p.categories.indexOf(tag) >= 0)
            .slice(offset, offset+limit)
}