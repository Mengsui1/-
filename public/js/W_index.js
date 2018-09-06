$(function(){
	//轮播图
	var S_lun_ul = document.getElementById('W_m_b_l_list');//轮播图的ul
	var S_lun_li = S_lun_ul.getElementsByTagName('li');
	var S_lun_liW = S_lun_ul.children[0].clientHeight;//找到ul下第一个获取li的长度

	var S_lunBox = document.getElementsByClassName('W_m_b_lun')[0];
	var S_lundir = document.getElementsByClassName('W_m_b_l_dian')[0];
	var S_lun_li_o = S_lundir.getElementsByTagName('li');
	var S_lun_left = document.getElementById('W_btn_left');
	var S_lun_right = document.getElementById('W_btn_right');

	lunbo(S_lunBox,S_lun_ul,S_lun_left,S_lun_right,S_lun_li,S_lun_li_o);
	
	//团购首页轮播图

	//列表块的特效
	$('.W_commodity_li_link').on('mousemove', function(e){
		var W_evn = e || window.event;
		var W_this = $(this).get()[0];
		var W_X = W_evn.offsetX - $(this).width() / 2;
		var W_Y = W_evn.offsetY - $(this).height() / 2;
		
		W_this.style.transform = 'rotateY('+W_X/30+'deg)';
	});
	
	$('.W_commodity_li_link').on('mouseout', function(e){
		var W_evn = e || window.event;
		var W_this = $(this).get()[0];
		W_this.style.transform = 'rotate(0deg)';
	});
	
	//滚动条事件
	var $W_ofTop = $('#W_m_tit').offset().top;
	$(window).on("scroll", function(){ 
		//当滚动条滚动时
		var $W_top = $(document).scrollTop();
		
		if($W_top > $W_ofTop){
			$('#W_m_tit').css({'position':'fixed','top':0});
			$('#W_btn_top').css({'filter':'alpha(opacity=100)','opacity':100});
			
		}else{
			$('#W_m_tit').css({'position':'static'});
			$('#W_btn_top').css({'filter':'alpha(opacity=0)','opacity':0});
		}
	}); 
	
	//点击回到顶部
	$('#W_btn_top').on('click',function(){
		$('html ,body').animate({scrollTop: 0}, 400);
		return false;
	});
	
	//排序切换
	var Wpai = document.getElementsByClassName('paixu');
	var Wpaipa = Wpai[1].getAttribute('data-pa'); 
	var Wpaixu = Wpai[1].getAttribute('data-xu'); 
	if(Wpaipa == ''){
		for(var i = 0; i < Wpai.length; i++){
			Wpai[i].setAttribute('class','paixu');
		}
		Wpai[0].setAttribute('class','active paixu');
	}else if(Wpaipa == 'xl'){
		for(var i = 0; i < Wpai.length; i++){
			Wpai[i].setAttribute('class','paixu');
		}
		Wpai[1].setAttribute('class','active paixu');
		if(Wpaixu<0){
			Wpai[1].setAttribute('href','/index/tuan?hover=1&pa=xl&xu=1');
			Wpai[1].children[0].innerHTML = '&#xe604;';
		}else{
			Wpai[1].setAttribute('href','/index/tuan?hover=1&pa=xl&xu=-1');
			Wpai[1].children[0].innerHTML = '&#xe501;';
		}
	}else if(Wpaipa == 'price'){
		for(var i = 0; i < Wpai.length; i++){
			Wpai[i].setAttribute('class','paixu');
		}
		Wpai[2].setAttribute('class','active paixu');
		if(Wpaixu>0){
			Wpai[2].setAttribute('href','/index/tuan?hover=1&pa=price&xu=-1');
			Wpai[2].children[0].innerHTML = '&#xe501;';
		}else{
			Wpai[2].setAttribute('href','/index/tuan?hover=1&pa=price&xu=1');
			Wpai[2].children[0].innerHTML = '&#xe604;';
		}
	}
});
