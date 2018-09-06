var mongoose = require('mongoose');

//建立用户表结构
module.exports = new mongoose.Schema({
    username: String,//用户名
    password: String,//密码
    regtime : {
    	type : Date,
    	default : Date.now
    },
    phone:String,
    userStatus : {
    	type : String,
    	default : '可用'
    },
    xiutime:{
    	type:String,
    	default:''
    }

});