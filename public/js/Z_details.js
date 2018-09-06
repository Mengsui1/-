$(function(){

    // 右侧导航栏固定
    $(document).ready(function() {  
        var navOffset=$(".Z_main").offset().top;
        $(window).scroll(function(){  
            var scrollPos=$(window).scrollTop();  
            if(scrollPos - 230 > navOffset){  
                $(".Z_right").addClass("Z_suck_top");
                $(".Z_buy_btn").attr('style','display:block');
                $(".Z_side").attr('style','position:fixed;height: 2000px;');  
            }else{  
                $(".Z_right").removeClass("Z_suck_top");
                $(".Z_buy_btn").attr('style','display:none');
                $(".Z_side").attr('style','height: 2000px;'); 
            }

        });  
  
    }); 

    // 导航
    $("#oUl>li:first").click( function () {
    	
    	
        $(this).addClass("cur").siblings().removeClass('cur');
        $(".Z_goods_detail").attr('style','display:block;');
        $(".Z_pingjia").attr('style','display:block;');
        $(".Z_purchase_record").attr('style','display:block;');
        $(".Z_message_mod").attr('style','display:block;');
        $(".Z_parameter").attr('style','display:none;');
        $(".Z_service_guarantee").attr('style','display:none;');
        $(".introduct").attr('style','display:block;');
        $(".Z_fw").attr('style','display:none;');
        $(".Z_buy_btn").attr('style','display:block');

    });
    $("#oUl>li:nth-child(2)").click( function () {
    	$('html ,body').animate({scrollTop:$('.Z_main').offset().top - 40}, 400);
        $(this).addClass("cur").siblings().removeClass('cur');
        $(".Z_parameter").attr('style','display:block;').siblings().attr('style','display:none;');
        $(".introduct").attr('style','display:none;');
        $(".Z_fw").attr('style','display:none;');
    });
    $("#oUl>li:nth-child(3)").click( function () {
    	$('html ,body').animate({scrollTop:$('.Z_main').offset().top - 40}, 400);
        $(this).addClass("cur").siblings().removeClass('cur');
        $(".Z_pingjia").attr('style','display:block;').siblings().attr('style','display:none;');
        $(".introduct").attr('style','display:none;');
        $(".Z_fw").attr('style','display:none;');
    });
    $("#oUl>li:nth-child(4)").click( function () {
    	$('html ,body').animate({scrollTop:$('.Z_main').offset().top - 40}, 400);
        $(this).addClass("cur").siblings().removeClass('cur');
        
        $(".Z_purchase_record").attr('style','display:block;').siblings().attr('style','display:none;');
        $(".introduct").attr('style','display:none;');
        $(".Z_fw").attr('style','display:none;');
    });
    $("#oUl>li:nth-child(5)").click( function () {
    	$('html ,body').animate({scrollTop:$('.Z_main').offset().top - 40}, 400);
        $(this).addClass("cur").siblings().removeClass('cur');
       
        $(".Z_message_mod").attr('style','display:block;').siblings().attr('style','display:none;');
        $(".introduct").attr('style','display:none;');
        $(".Z_fw").attr('style','display:none;');
    });
    $("#oUl>li:nth-child(6)").click( function () {
    	$('html ,body').animate({scrollTop:$('.Z_main').offset().top - 40}, 400);
        $(this).addClass("cur").siblings().removeClass('cur');
        
        $(".Z_service_guarantee").attr('style','display:block;').siblings().attr('style','display:none;');
        $(".introduct").attr('style','display:none;');
        $(".Z_fw").attr('style','display:block;');
    });


    // 楼层
    var oNav = $('.Z_fw');
    var aNav = oNav.find('li');
    
    aNav.click(function() {
        $('body,html').animate({
            "scrollTop": $('.Z_service-title').eq($(this).index()).offset().top
        }, 500);
        $(this).children('a').addClass('Z_cur').parent('li').siblings().children('a').removeClass('Z_cur');
    });

    

    $(".introduct>li:nth-child(2)").click( function () {
        $(".introduct").attr('style','display:none;');
        $(".Z_service_guarantee").attr('style','display:block;').siblings().attr('style','display:none;');
        $(".Z_fw").attr('style','display:block;');
        $("#oUl>li:nth-child(6)").addClass("Z_cur").siblings().removeClass("Z_cur");
    });


});