var mongoose = require('mongoose');

module.exports = new mongoose.Schema({
    goodsListName: String,//分类名称
    goodsListPid: String
});