$(function(){
	$('.main-left').find('li').each(function(i){
		$(this).on('click',function(){	
			$('.main-left').find('li').removeAttr('class')
			$(this).attr('class','L_style');
			$('.Choice').css('display','none');
			$('.Choice').eq(i).css("display","block");
		})	
	})

})