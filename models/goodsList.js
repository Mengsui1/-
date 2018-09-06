//商品总类

var mongoose = require('mongoose');

var goodsListSchema = require('../schemas/goodsListSchema');

module.exports = mongoose.model('GoodsList', goodsListSchema);