window.onload = function(){

	$('#L_lunbo').on('mouseover',function(){
		$('.L_zhishi').css('display','block');
		clearInterval(timer);
	}).on('mouseout',function(){
		$('.L_zhishi').css('display','none');
		lunbo();
	});
	$('.L_recommend_food').find('li').eq(0).attr('class','L_to_width');
	var Lul = $('.L_two').find('li').eq(0).attr('class','L_sale L_clear L_not');
	var Lul = $('.L_two').find('li').eq(1).attr('class','L_sale L_clear');
	var Lul = $('.L_three').find('li').eq(0).attr('class','L_sale L_clear L_not');
	var Lul = $('.L_three').find('li').eq(1).attr('class','L_sale L_clear');
	// 定义定时器的全局开关
	var timer = null;
	// 定义index索引
	var index = 1;
	function lunbo(){
		timer = setInterval(function(){
			if(index == 0){
				move($('.L_tu').find('li')[0],{'opacity':0});
				move($('.L_tu').find('li')[1],{'opacity':100},function(){
					index++;
				});
				// 改变下方指示器的样式
				$('.L_dian>li')[0].className = '';
				$('.L_dian>li')[1].className = 'L_to-color';

			}else{
				move($('.L_tu').find('li')[1],{'opacity':0});
				move($('.L_tu').find('li')[0],{'opacity':100},function(){
					index--;
				});
				// 改变下方指示器的样式
				$('.L_dian>li')[1].className = '';
				$('.L_dian>li')[0].className = 'L_to-color';
			}
		},3000);	
	}
	lunbo();

	// 定义点击
	$('.L_dian>li').each(function(i){
		this.index = i;
	}).on('click',function(){
		clearInterval(timer);
		index = this.index;
		move($('.L_tu').find('li')[this.index],{'opacity':100});
		move($('.L_tu').find('li')[index==1?--index:++index],{'opacity':0},function(){
			// lunbo();
		});
		// 改变下方指示器的样式
		$('.L_dian>li').removeClass('L_to-color')
		$('.L_dian>li')[this.index].className = 'L_to-color';

	})
	$('.L_zhishi>li').on('click',function(){
		clearInterval(timer);
		var index2 = index;
		move($('.L_tu').find('li')[index],{'opacity':0});
		move($('.L_tu').find('li')[index==1?--index:++index],{'opacity':100},function(){
			// lunbo();
		});
		// 改变下方指示器的样式
		$('.L_dian>li').removeClass('L_to-color')
		$('.L_dian>li')[index2==1?--index2:++index2].className = 'L_to-color';
	});
	// 定义手风琴
	$('.L_recommend_food li').on('mouseover',function(){
		$('.L_to_width').removeClass('L_to_width');
		$(this).addClass('L_to_width');
	})
	// 定义选项卡
	$('.L_one_head a').on('mouseover',function(){
		$('.L_one_head a').removeClass('L_bgColor');
		$(this).addClass('L_bgColor');
	} );
	$('.L_two_head a').on('mouseover',function(){
		$('.L_two_head a').removeClass('L_bgColor');
		$(this).addClass('L_bgColor');
	});
	$('.L_three_head a').on('mouseover',function(){
		$('.L_three_head a').removeClass('L_bgColor');
		$(this).addClass('L_bgColor');
	});
	// 定义销量榜
	// console.log($('.L_two>.L_sale').last())
	$('.L_two>li').not('.L_not').on('mouseover',function(){
		$('.L_two>.L_sale').last().addClass('L_sale2').removeClass('L_sale');
		$(this).addClass('L_sale').removeClass('L_sale2');
	})
	$('.L_three>li').not('.L_not').on('mouseover',function(){
		$('.L_three>.L_sale').last().addClass('L_sale2').removeClass('L_sale');
		$(this).addClass('L_sale').removeClass('L_sale2');
	});
	// 定义运动框架
	function move(obj,json,fn){
		// console.log(obj)
		// 定时器开启之前需要关闭
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){

			for(var attr in json){
				// 定义属性初始值
				var now = 0;
				if(attr == "opacity"){
					now = getStyle(obj,attr) * 100;
				}else{
					now = parseInt(getStyle(obj,attr));
				}
				// 定义速度
				var speed = (json[attr] - now)/10;
				// console.log(now,speed)
				// 速度取整
				speed = speed>0?Math.ceil(speed):Math.floor(speed);

				if(json[attr] !== now){
					if(attr == 'opacity'){
						// 进行赋值
						obj.style.opacity = (now + speed) / 100;
					}else{
						obj.style[attr] = (now + speed) + 'px';
					}
				}else{
					clearInterval(obj.timer);
					// 判断是否有传函数进来，有就执行，没有就不执行
					fn && fn();
				}
			
			}

		},30)
	}
	// 获取外部样式
	function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}
	
	//ajax请求数据
	var link1 = $('.L_link_one').get();
	for(var i = 0; i < link1.length; i++){
		link1[i].index = i;
		link1[i].addEventListener('mouseover',function(){
			var that = this;
			ajaxObj($('#Fone li'),'1F',that.index);
			
		},false);
	}
	var link2 = $('.link_two').get();
	for(var i = 0; i < link2.length; i++){
		link2[i].index = i;
		link2[i].addEventListener('mouseover',function(){
			var that = this;
			ajaxObj($('#Ftwo li'),'2F',that.index);
			
		},false);
	}
	var link3 = $('.link_three').get();
	for(var i = 0; i < link3.length; i++){
		link3[i].index = i;
		link3[i].addEventListener('mouseover',function(){
			var that = this;
			ajaxObj($('#Fthree li'),'3F',that.index);
			
		},false);
	}
	
	
	function ajaxObj(obj,datas,index){
		$.ajax({
			type: 'post',
			url: "/index/Wajax2",
			data: {
				num:index,
				datas:datas,
			},
			dataType: 'json', //指定要返回的数据类型
			success: function(data){
				var result = data.result;
				for(var j = 0 ; j< result.length; j++){
					obj.eq(j).find('.titImg').attr('href','/index/details?hover=1&id='+result[j]._id.toString());
					obj.eq(j).find('.title_link').attr('href','/index/details?hover=1&id='+result[j]._id.toString());
					obj.eq(j).find('.title_link').html(result[j].title);
					obj.eq(j).find('.titImg img').attr('src',result[j].mainpic[0]);
					obj.eq(j).find('.price em').html(result[j].price);
				}
			}
		});
	}
}