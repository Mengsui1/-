//存储详情页数据
var mongoose = require('mongoose');

var date = new Date();

var time = date.toLocaleDateString();//将时间对象转换成字符串格式

mongoose.connect('mongodb://localhost:27017/blog', {useMongoClient: true}, function (err) {

    if (err) {
        console.log('数据库连接失败!');
        return;
    } else {

        var goodsSchema = new mongoose.Schema({
			Wclass: String,//类型，1手机2电脑3DIY4数码5外设6智能7其他
			WminPic: String,//默认官方标配套餐一价格为最低价格
		   	Wimages: String,//商品图片大中小
		    Waddress: String,//商品地址
		    Wserve: String,//服务保障，买家店名
		    WgroupGood: String,//团购商品
		    Wversion: Array,//商品版本
		    Wrecord: Array,//购买记录
		    Wassess: Array,//商品评价、成交记录
		    Wtimer:String//时间字符串
		});
        
       	var Goods = mongoose.model('Goods', goodsSchema);
       	
       	
        
        var oGood = new Goods({
			Wclass: '3',
			WminPic: '4799.00',//默认官方标配套餐一价格为最低价格
		    Wimages: [
			    '/public/img/bBrainImg1.jpg',
			    '/public/img/bBrainImg2.jpg',
			    '/public/img/bBrainImg3.jpg',
			    '/public/img/bBrainImg4.jpg',
			    '/public/img/bBrainImg5.jpg'
		    ]
				
				
		    ],//商品图片组
		    Waddress:{
		    	type: String,
		    	defaul: '浙江'
		    },//商品地址
		    Wserve: '永盛嘉合电脑专营店',//服务保障，买家店名
		    WgroupGood: '黑色',//团购商品颜色
		    Wversion: [
		    
		    	{
			    	'version':'小新 锐7000（i5 7300HQ/4GB/1TB）',//版本，版本为空时，不显示版本号
			    	'name': '联想（Lenovo）小新锐7000 游戏本15.6英寸轻薄游戏笔记本电脑GTX1050独显 标配 （i5 7300HQ/4GB/1TB）',
			    	'tit': 'GTX1050游戏本 酷睿I5七代',
			    	'num':'100',
			    	'Wsuit':[
			    		{
			    			'suit':'官方标配',
			    			'tit':'官方标配',
			    			'pic':'4799.00',
			    			'pic1':'',
			    		},
		    			{
		    				'suit':'套餐一',
		    				'tit':'标配+笔记本包+鼠标+头戴式耳机+外壳膜+屏幕膜+防水键盘膜+鼠标垫+清洁套装',
		    				'pic':'4899.00',
			    			'pic1':'',
		    			}
			    	],
			    	color:['黑色','银色']
		    	},
		    	
		    	{
		    		'version':'小新 锐7000（i5 7300HQ/8GB/128GB+1TB）',//类型
		    		'num':'100',//件数
		    		'Wsuit':[//套餐
			    		{
			    			'suit':'官方标配',
			    			'tit':'官方标配',
			    			'pic':'5499.00',
			    			'pic1':'',
			    		},
		    			{
		    				'suit':'套餐一',
		    				'tit':'标配+笔记本包+鼠标+头戴式耳机+外壳膜+屏幕膜+防水键盘膜+鼠标垫+清洁套装',
		    				'pic':'5599.00',
			    			'pic1':'',
		    			}
			    	],
			    	color:['黑色']//颜色
		    	},
		    	
		    	{
		    		'version':'小新 锐7000（i7 7700HQ/8GB/128GB+1TB）',
		    		'num':'100',
		    		'Wsuit':[//套餐
			    		{
			    			'suit':'官方标配',
			    			'tit':'官方标配',
			    			'pic':'5799.00',
			    			'pic1':'5999.00',
			    		},
		    			{
		    				'suit':'套餐一',
		    				'tit':'标配+笔记本包+鼠标+头戴式耳机+外壳膜+屏幕膜+防水键盘膜+鼠标垫+清洁套装',
		    				'pic':'6099.00',
			    			'pic1':'',
		    			}
			    	],
			    	color:['黑色']//颜色
		    	},
		    	
		    	{
		    		'version':'小新 锐7000（i7 7700HQ/4GB/1TB）',
		    		'num':'100',
		    		'Wsuit':[//套餐
			    		{
			    			'suit':'官方标配',
			    			'tit':'官方标配',
			    			'pic':'5899.00',
			    			'pic1':'',
			    		},
		    			{
		    				'suit':'套餐一',
		    				'tit':'标配+笔记本包+鼠标+头戴式耳机+外壳膜+屏幕膜+防水键盘膜+鼠标垫+清洁套装',
		    				'pic':'5999.00',
			    			'pic1':'',
		    			},
		    			{
		    				'suit':'套餐二',
		    				'tit':'标配+笔记本包+鼠标+4G内存+外壳膜+屏幕膜+防水键盘膜+鼠标垫+清洁套装+5米网线',
		    				'pic':'6199.00',
			    			'pic1':'',
		    			},
		    			{
		    				'suit':'套餐三',
		    				'tit':'标配+包包+鼠标+SSD120G高速固态盘+外壳膜+屏幕膜+防水键盘膜+清洁套装+鼠标垫+5米网线',
		    				'pic':'6299.00',
			    			'pic1':'',
		    			},
		    			{
		    				'suit':'套餐四',
		    				'tit':'标配+包包+鼠标+4G笔记本内存+120G SSD固态硬盘+（全套膜）清洁套装+鼠标垫+5米网线',
		    				'pic':'6499.00',
			    			'pic1':'',
		    			}
			    	],
			    	color:['黑色']//颜色
		    	}
		    ],//商品版本和版本的库存还有套装颜色价格
		    Wrecord: [],//购买记录
		    Wassess: [],//商品评价、成交记录
		    Wtimer:time//时间
		});
		
		oGood.save((error) => {
			if(!error){
				console.log('添加成功');
			}else{
				console.log('添加失败');
			}
		});
    }
});


		
