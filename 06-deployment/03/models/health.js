const database = require('../db')

async function checkHealth(){
    const result = await database.connection.db.admin().ping()

    if(result.ok === 0) throw new Error('DB Healthcheck Failed')
    return !!result
}

module.exports = {
    checkHealth
}