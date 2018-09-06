$(function(){
	// 点击弹出收货地址表收货地址
	$(".Z_links").on('click',function(evn){
		// 阻止冒泡
		var event = evn || window.event;
		event.stopPropagation();

		$('.L_none').css('display','block');

		$(this).css('display','none');
		$('.x_addnew').css('display' , 'none').siblings('.x_addnews').css('display' , 'none');

		$('.L_dizhi > input[type="radio"]').eq(0).prop('cheched', false).end().eq(1).prop('checked', 'checked')
	})

	$('.x_addnew').on('click' ,function(evn) {
		var event = evn || window.event;
		event.stopPropagation();
		$('.L_none').css('display','block');
		$(this).css('display' , 'none').siblings('.x_addnews').css('display' , 'none');
		$(".Z_links").css('display' , 'none');
		$('.L_dizhi > input[type="radio"]').eq(0).prop('cheched', false).end().eq(1).prop('checked', 'checked')
	})

	$('.L_dizhi').on('click', function() {
		$('.L_none').css('display','none');
		$('.x_addnew').css('display' , 'inline-block').siblings('.x_addnews').css('display' , 'inline-block');
		$('.L_dizhi > input[type="radio"]').eq(0).prop('checked', 'checked').end().eq(1).prop('checked', false)
	})


})