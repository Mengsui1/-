//商品详情表

var mongoose = require('mongoose');

var goodsSchema = require('../schemas/goodsSchema');

module.exports = mongoose.model('Goods', goodsSchema);