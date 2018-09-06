$(function(){
	//侧边栏特效
	var S_list = $('#S_list').get()[0];
	var S_lists = S_list.getElementsByTagName('li');
	var S_listSpan = S_list.getElementsByClassName('S_listSpan');
	for	(var i = 0; i < S_lists.length; i ++){
		S_lists[i].index = i;
		S_lists[i].onmouseover = function(){
			
			this.style.background = '#ff3333';
			move(S_listSpan[this.index], {'left':-60});
		}
		S_lists[i].onmouseout = function(){
			this.style.background = '#2D2D2D';
			move(S_listSpan[this.index], {'left':60});
		}
	}
	//首页轮播图
	var W_now_l_num = 0;
	var W_l_li = $('.W_lunboLi').get();
	var W_l_right = $('.W_lun_btn_right').get()[0];
	var W_l_left = $('.W_lun_btn_left').get()[0];
	var W_sm_liBtn = $('.W_lunboOlli').get();
	//下一张
	W_l_right.onclick = next;
	W_l_left.onclick = pre;
	var W_timer = null;
	//自动播放
	W_timer = setInterval(next,4000);
	$('.W_lunbo').on('mouseover',function(){
		clearInterval(W_timer);
	});
	$('.W_lunbo').on('mouseout',function(){
		W_timer = setInterval(next,4000);
	});
	function next(){
		if(W_now_l_num >= W_l_li.length - 1){
			W_now_l_num = 0;
		}else{
			W_now_l_num++;
		}
		for (var i = 0; i < W_l_li.length; i++){

			W_l_li[i].style.display = 'none';
			W_sm_liBtn[i].children[0].setAttribute('class','');


		}
		W_sm_liBtn[W_now_l_num].children[0].setAttribute('class','W_lunboOlli_active');
		W_l_li[W_now_l_num].style.display = 'block';
		
	}
	//上一张
	function pre(){
		if(W_now_l_num <= 0){
			W_now_l_num = W_l_li.length-1;
		}else{
			W_now_l_num--;
		}
		for (var i = 0; i < W_l_li.length; i++){

			W_l_li[i].style.display = 'none';
			W_sm_liBtn[i].children[0].setAttribute('class','');


		}
		W_sm_liBtn[W_now_l_num].children[0].setAttribute('class','W_lunboOlli_active');
		W_l_li[W_now_l_num].style.display = 'block';
		
	}
	//	小按钮
	
	for	(var i = 0; i < W_sm_liBtn.length; i ++){
		W_sm_liBtn[i].index = i;
		W_sm_liBtn[i].onclick = function(){
			for (var i = 0; i < W_l_li.length; i++){
				W_l_li[i].style.display = 'none';
				W_sm_liBtn[i].children[0].setAttribute('class','');
			}
			this.children[0].setAttribute('class','W_lunboOlli_active');
			W_l_li[this.index].style.display = 'block';
			W_now_l_num = this.index;
		}
	}
	
	
// 电子竞技

	$('#S_game').find('li').on('click',function(){
		// console.log($(this).attr('title'));
		$(this).css('border-bottom','2px solid white').siblings().css('border','none')
	});

//团购
	var S_tuan = document.getElementsByClassName('L_li');
	for(var i = 0; i < S_tuan.length; i++){
		S_tuan[i].onmouseover = function(){
			var S_tuan_hid = this.getElementsByClassName('S_tuan_hid')[0];
			move(S_tuan_hid,{'top':0});
			
		}
		S_tuan[i].onmouseout = function(){
			var S_tuan_hid = this.getElementsByClassName('S_tuan_hid')[0];
			move(S_tuan_hid,{'top':160});
		}
			
	}
  //智选
	var W_aj_ul = document.getElementsByClassName('W_aj_ul')[0];
	var W_aj_ul_li = W_aj_ul.getElementsByTagName('li');
	var W_aj_uls = document.getElementsByClassName('W_aj_uls')[0];
	var W_aj_uls_li = W_aj_uls.getElementsByTagName('li');
	for(var i = 0; i < W_aj_ul_li.length; i++){
		W_aj_ul_li[i].index = i;
		W_aj_ul_li[i].onmouseover = function(){
			for(var j = 0; j < W_aj_uls_li.length;j++){
				W_aj_uls_li[j].style.display = 'none';
				W_aj_ul_li[j].style.background = '#ECECEC';
				W_aj_ul_li[j].style.color = 'black';
			}
			W_aj_uls_li[this.index].style.display = 'block';
			this.style.background = '#CE1A1B';
			this.style.color = 'white';
		}
	}
	//电子异步请求数据
	var W_list = $('#S_game').find('li').get();
	var newBigArr1 = [];
	var newBigArr2 = [];
	var newBigArr3 = [];
	var newBigArr4 = [];
	var ajaxLi = $('.ajaxLi').get();
	
	for(var i = 0; i < W_list.length; i++) {
		W_list[i].index = i;
		W_list[i].addEventListener('click',function(){
			var that = this;
			$.ajax({
				type: 'post',
				url: "/index/Wajax",
				data: {
					num:that.index,
				},
				dataType: 'json', //指定要返回的数据类型
				success: function(data) {
					
					for(var i = 0; i < data.result.length; i++){
						if(data.result[i].indexImg != ''){
							newBigArr1.push(data.result[i]);
						}
						if(data.result[i].tid == '3'){
							newBigArr2.push(data.result[i]);
						}
						if(data.result[i].tid == '4'){
							newBigArr3.push(data.result[i]);
						}
						if(data.result[i].tid == '2'){
							newBigArr4.push(data.result[i]);
						}
						
					}
					newBigArr3 = newBigArr3.slice(0,3);
					newBigArr4 = newBigArr4.slice(0,3);
					var newArr = [newBigArr4,newBigArr2,newBigArr3];
					$('.ajaxImgB').attr('href','/index/details?id='+ newBigArr1[data.num]._id.toString() +'&hover=1');
					$('.ajaxImgB').find('img').attr('src',newBigArr1[data.num].indexImg);

					
					for(var i = 0; i < ajaxLi.length; i++){
						$('.ajaxLi').eq(i).find('.f_Link').attr('href','/index/details?id='+ newArr[data.num][i]._id.toString() +'&hover=1');
						$('.ajaxLi').eq(i).find('.f_Link img').attr('src',newArr[data.num][i].mainpic[0]);
						$('.ajaxLi').eq(i).find('.f_p').html('￥'+ newArr[data.num][i].price +'.00');
					}
					
				}
			});
		},false);
	}
});