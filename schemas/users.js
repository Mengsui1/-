/**
 * Created by neo老师 on 2017/8/17
 * 兄弟连IT教育
 */

var mongoose = require('mongoose');

//建立用户表结构
module.exports = new mongoose.Schema({
    username: String,//用户名
    password: String,//密码
    isAdmin : String,//数字123代表权限
    AddTime: String,//注册的时间
    xiuTime: String//修改的时间
});
