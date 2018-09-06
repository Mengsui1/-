//obj jq对象的方法
//num 查找的商品类型
//math 需要的数量
function get_vue(obj,num,math){
	new Vue({
		delimiters:['${','}'],
	
		el:obj,
		data:{
			findSql:[],//接收后台数据
			show:true
		},
		methods:{
			find:function(){
				var that = this;
				$.ajax({
					type: 'post',
	                data:{
	                	num:num,
	                	limit:6
	                },
	                url: '/index/find',
	                dataType:'json',
	                success: function (result) {
	                	if(result.length>0 &&result.length>= math){
	                		for	(var i = 0; i < result.length; i ++){
	                			if(i > math - 1){
	                				break;
	                			}else{
	                				that.findSql.push(result[i]);
	                			}
	                		}
	                		
	                	}else if(result.length>0 &&result.length< math){
	                		that.findSql.push(result[i]);
	                	}else{
	                		that.findSql = null;
	                	}
	                }
				});
			}
		},
		mounted(){
			this.find();
		}
	});
}

function index_vue(obj,num,math){
	new Vue({
		delimiters:['${','}'],
	
		el:obj,
		data:{
			findSql:[],//接收后台数据
			show:true
		},
		methods:{
			find:function(){
				var that = this;
				$.ajax({
					type: 'post',
	                data:{
	                	num:num,
	                	limit:6
	                },
	                url: '/index/find2',
	                dataType:'json',
	                success: function (result) {
	                	console.log(result)
	                	if(result.length>0 &&result.length>= math){
	                		for	(var i = 0; i < result.length; i ++){
	                			if(i > math - 1){
	                				break;
	                			}else{
	                				that.findSql.push(result[i]);
	                			}
	                		}
	                		
	                	}else if(result.length>0 &&result.length< math){
	                		that.findSql.push(result[i]);
	                	}else{
	                		that.findSql = null;
	                	}
	                }
				});
			}
		},
		mounted(){
			this.find();
		}
	});
}