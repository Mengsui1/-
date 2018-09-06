$(function(){
	//头部下拉框
	$('.W_head_top').find('.W_head_top_a').css({"color":"#666","text-decoration":"none"});
	
	$('.W_head_top').on('mouseover',function(){
		
		
		var $W_h_box = $('.W_h_box');
		$(this).css({
			'background':'white',
			"border-left-color":"#e6e6e6",
			"border-right-color":"#e6e6e6",
			"border-bottom-color":"#ffffff",
		});
		$(this).find('.W_h_box').css({'display':'block'});

	}).on('mouseout',function(){
		$(this).css({
			'background':'#f5f5f5',
			"border-left-color":"#f5f5f5",
			"border-right-color":"#f5f5f5",
			"border-bottom-color":"#e6e6e6",
		});
		
		$(this).find('.W_head_top_icon').css({
			"transfrom":"rotate(-180deg)"
		});
		$(this).find('.W_h_box').css({'display':'none'});
	});
	
	//导航下拉列表
	var $W_list_height = 0;

	var $W_list = $('.W_nav_mainH').find('.W_nav_mainH_list li');
	$W_list.each(function(i){
		$W_list_height += $W_list[i].offsetHeight;
		
		$(this).on('mouseover',function(){
			$(this).css('background','#fff');
			$(this).find('a').css('color','#666');
			$(this).find('.W_icon_left').css('color','#333');
			
		}).on('mouseout',function(){
			$(this).css('background','none');
			$(this).find('.W_icon_left').css('color','#fff');
			$(this).find('a').css('color','#fff');
		});
	});
	var $W_head_nav = $('.W_nav_mainH').find('.W_nav_mainH_list').get();
	
	$('.W_nav_mainH').on('mouseover',function (){

		move($W_head_nav[0],{'height':$W_list_height + 20});

	}).on('mouseout',function(){
		move($W_head_nav[0],{'height':0});
	});
	// 找到后台返回的hover值
	var W_hover = $('.W_nav_mainL').get()[0];
	var W_hoverList = W_hover.getElementsByTagName('li');
	var W_hovernum = W_hover.getAttribute('data-hover');
	W_hovernum = W_hovernum || 0;
	for (var i = 0; i < W_hoverList.length; i ++){
		if(i == W_hovernum){
			var W_hoverListLink =  W_hoverList[i].getElementsByTagName('a')[0];
			W_hoverListLink.setAttribute('href','javascript:;');
			W_hoverList[i].setAttribute('class','W_nav_mainL_active');
		}else{
			W_hoverList[i].setAttribute('class','');
		}
	}
	
	//用户退出处理
	$('.W_out').on('click',function(){
		$.ajax({
            type: 'post',
            url: '/logout',
            success: function (result) {
                if(result.code == '404'){
                    window.location.href = '/index';
                }
            }
        });
	});
	
	//头部输入框
	$('.W_search_ipt_text').on('focus',function(){
		$('.W_search_link').css({'display':'none'});
	}).on('blur',function(){
		$('.W_search_link').css({'display':'block'});
	});
});


