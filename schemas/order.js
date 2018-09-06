var mongoose = require('mongoose');

// DateTime.Now.ToString("yyyyMMdd")
//建立用户表结构
module.exports = new mongoose.Schema({
    subnum : String,
    uid : String,
    sendAdd : String,
    spDate : String,
    spPrice : Number,
    sendDate : String,
    spphone : String,
    spname : String,
    spStatus : Number,


});