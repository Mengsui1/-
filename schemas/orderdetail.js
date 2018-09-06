var mongoose = require('mongoose');


module.exports = new mongoose.Schema({
    gid : String,
    oid : String,
    name : String,
    price : Number,
    count : Number,
    color : String
});