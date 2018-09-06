

$(function(){

	//轮播图
	var S_lun_ul = document.getElementById('S_ul');//轮播图的ul
	var S_lun_li = S_lun_ul.getElementsByTagName('li');
	var S_lun_liW = S_lun_ul.children[0].clientHeight;//找到ul下第一个获取li的长度
	var S_result = S_lun_liW * 3 + 6;
	var S_lunBox = document.getElementsByClassName('L_box')[0];
	var S_lundir = document.getElementsByClassName('S_s_rect')[0];
	var S_lun_li_o = S_lundir.getElementsByTagName('li');
	var S_lun_left = document.getElementById('S_pre');
	var S_lun_right = document.getElementById('S_next');

	lunbo(S_lunBox,S_lun_ul,S_lun_left,S_lun_right,S_lun_li,S_lun_li_o);
	
	
	//楼层跳转函数
	var lou_timer = null;
	var lou_stop = true;
	function sTop(target){
		var speed = 0;
		clearInterval(lou_timer);
		lou_timer = setInterval(function(){
			lou_stop = true;
			var Top = document.body.scrollTop || document.documentElement.scrollTop;
			speed = (target - Top) / 7;
			speed = this.speed > 0 ? Math.ceil(speed) : Math.floor(speed);
			
			if(Math.abs(target - Top) < 1) {
				clearInterval(lou_timer);
			}else{
				document.body.scrollTop = document.documentElement.scrollTop = Top + speed;
				
			}
		},30);
		
	}
	var W_tops = $('.L_go').get();
	var W_floor = $('#S_floor').find('li').get();
	for (var i = 0; i < W_floor.length - 1; i++){
		W_floor[i].index = i;
		W_floor[i].onclick = function(){

			sTop(W_tops[this.index].offsetTop);
		}
	}
	W_floor[7].onclick = function(){

		sTop(0);
	}
	
	$('.S_linkTop').click(function(){
		sTop(0);
	});
	window.onscroll = function(){
		var dst = document.body.scrollTop = document.documentElement.scrollTop;
		if(dst >= 700){
			S_floor.style.display = 'block'
		}else{
			S_floor.style.display = 'none'
		}
		
		if(!lou_stop){
			clearInterval(lou_timer);

		}
		lou_stop = false;
	}
});

