const mongoose = require('mongoose')

const uri = "mongodb+srv://<username>:<password>@<cluster_name>.bacgw.mongodb.net/<collection>?retryWrites=true&w=majority";
mongoose.connect(
    uri,
    { useNewUrlParser: true }
)
module.exports = mongoose