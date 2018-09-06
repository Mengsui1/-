$(function(){
		// 放大镜
		var ImgD = $('.x_box > img').get()[0];
	$('.x_box_big').mouseover(function() {
		$('.x_box > img').css({'width':'800px','height':'800px'});
	}).mouseout(function() {
		$('.x_box > img').css({'width':'400px','height':'400px'});
		ImgD.style.marginTop = 0;
		ImgD.style.marginLeft = 0;
	});
	$('.x_box_big').on('mousemove',function(evn) {
		var x = evn.offsetX;
		var y = evn.offsetY;
		if(x < 100){
			ImgD.style.marginLeft ='0px';
		}else if(x >=100 && x <= 300){
			ImgD.style.marginLeft =-2*(x-100) + 'px';
		}else if(x > 300){
			ImgD.style.marginLeft ='-400px';
		}
		if(y < 100){
			ImgD.style.marginTop ='0px';
		}else if(y >=100 && y <= 300){
			ImgD.style.marginTop =-2*(y-100) + 'px';
		}else if(y > 300){
			ImgD.style.marginTop ='-400px';
		}
		

	})
	
	// 展示图片
	$('.x_goods_pic > li').eq(0).css({'borderColor' : 'red'}).end().each(function(i) {
		$(this).on('click', function() {

			$('.x_box > img').attr('src', $(this).find('img').attr('src'));

			$(this).css({'borderColor' : 'red'}).siblings().css({'borderColor' : 'white'});
		})
	})
	$('.x_sh').each(function (i) {
		$(this).on('mouseover', function() {
			$('.sp').eq(i).css({'color' : '#CC0000'})
		}).on('mouseout', function() {
			$('.sp').eq(i).css({'color' : '#F2BFBF'})
		})
	})
	
	// 地址选择 利用冒泡事件
	var timer = null;
	$('.x_addhov').mouseover(function() {
		$(this).css({'backgroundColor' : "#c00"});
		$('.x_ad_name').css('color' , "white");
		$('#icon').attr('class' , 'iconfont icon-shangjiantou')
		$('.x_address').css({'display' : "block"});
		clearInterval(timer)
	}).mouseout(function() {
	
		timer = setInterval(function() {
			$('.x_addhov').css({'backgroundColor' : "white"});
			$('.x_ad_name').html('浙江').css('color' , "#333");
			$('#icon').attr('class' , 'iconfont icon-shangxiajiantou');
			$('.x_address').css({'display' : "none"});
			clearInterval(timer)
		}, 100);
		
	});
	
	// 二级联动
	var oDiv = document.getElementsByClassName('x_address_detail')[0];
	// 准备数据
	// 省
	var provice_data = ['北京','上海','天津','重庆','黑龙江','辽宁','吉林','河北','内蒙','陕西','山西','甘肃','宁夏','新疆','西藏','青海','四川','云南','贵州','湖南','湖北','河南','山东','安徽','江苏','浙江','广东','广西','江西','福建','海南', '火星'];
	// 市
	var city_data = [
		['海淀区','东城区','西城区','朝阳区','宣武区','丰台区','通州区','房山区','门头沟区','其它地区','石景山区','昌平区','怀柔区','密云区','崇文区','大兴区','平谷区','顺义区','延庆区'],
	
		['徐汇区','静安区','黄浦区','南市区','闵行区','长宁区','嘉定区','普陀区','宝山区','闸北区','杨浦区','虹口区','浦东新区','崇明县','奉贤县','金山区','卢湾区','松江区','南汇县','青浦县'],
	
		['和平区','河西区','河东区','红桥区','塘沽区','南开区','静海县','武清县','宝坁县','蓟县','大港区','北辰区','西青区','河北区','汉沽区','津南区','东丽区'],
	
		['万州区','江津市','合川区','永川区','南川市','重庆市','涪陵区','秀山区'],
	
		['哈尔滨市','齐齐哈尔市','鸡西市','大庆市','双鸭山市','鹤岗市','伊春市','佳木斯市','牡丹江市','七台河市','黑河市','绥化市','安达市','北安市','五大连池市','绥芬河市','阿城市','富锦市','铁力市','密山市','尚志市','大兴安','大兴安岭'],
	
		['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','葫芦岛市','营口市','阜新市','辽阳市','铁岭市','朝阳市','盘锦市','瓦房店市','海城市','北票市','开原市','凌源市','凌海市','铁法市','兴城市','东港市'],
	
		['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延吉市','图们市','公主岭市','梅河口市','敦化市','洮南市','大安市','龙井市','珲春市','德惠市'],
	
		['石家庄市','唐山市','邯郸市','邢台市','保定市','张家口市','承德市','秦皇岛市','沧州市','廊坊市','衡水市','鹿泉市','桃城区','泊头市','辛集市','涿州市','定州市','任丘市','武安市','藁城市','霸州市','安国市','晋州市','遵化市','三河市','冀州市','南宫市','宣化市'],
		['海淀区','东城区','西城区','朝阳区','宣武区','丰台区','通州区','房山区','门头沟区','其它地区','石景山区','昌平区','怀柔区','密云区','崇文区','大兴区','平谷区','顺义区','延庆区'],
	
		['徐汇区','静安区','黄浦区','南市区','闵行区','长宁区','嘉定区','普陀区','宝山区','闸北区','杨浦区','虹口区','浦东新区','崇明县','奉贤县','金山区','卢湾区','松江区','南汇县','青浦县'],
	
		['和平区','河西区','河东区','红桥区','塘沽区','南开区','静海县','武清县','宝坁县','蓟县','大港区','北辰区','西青区','河北区','汉沽区','津南区','东丽区'],
	
		['万州区','江津市','合川区','永川区','南川市','重庆市','涪陵区','秀山区'],
	
		['哈尔滨市','齐齐哈尔市','鸡西市','大庆市','双鸭山市','鹤岗市','伊春市','佳木斯市','牡丹江市','七台河市','黑河市','绥化市','安达市','北安市','五大连池市','绥芬河市','阿城市','富锦市','铁力市','密山市','尚志市','大兴安','大兴安岭'],
	
		['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','葫芦岛市','营口市','阜新市','辽阳市','铁岭市','朝阳市','盘锦市','瓦房店市','海城市','北票市','开原市','凌源市','凌海市','铁法市','兴城市','东港市'],
	
		['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延吉市','图们市','公主岭市','梅河口市','敦化市','洮南市','大安市','龙井市','珲春市','德惠市'],
	
		['石家庄市','唐山市','邯郸市','邢台市','保定市','张家口市','承德市','秦皇岛市','沧州市','廊坊市','衡水市','鹿泉市','桃城区','泊头市','辛集市','涿州市','定州市','任丘市','武安市','藁城市','霸州市','安国市','晋州市','遵化市','三河市','冀州市','南宫市','宣化市'],
		['海淀区','东城区','西城区','朝阳区','宣武区','丰台区','通州区','房山区','门头沟区','其它地区','石景山区','昌平区','怀柔区','密云区','崇文区','大兴区','平谷区','顺义区','延庆区'],
	
		['徐汇区','静安区','黄浦区','南市区','闵行区','长宁区','嘉定区','普陀区','宝山区','闸北区','杨浦区','虹口区','浦东新区','崇明县','奉贤县','金山区','卢湾区','松江区','南汇县','青浦县'],
	
		['和平区','河西区','河东区','红桥区','塘沽区','南开区','静海县','武清县','宝坁县','蓟县','大港区','北辰区','西青区','河北区','汉沽区','津南区','东丽区'],
	
		['万州区','江津市','合川区','永川区','南川市','重庆市','涪陵区','秀山区'],
	
		['哈尔滨市','齐齐哈尔市','鸡西市','大庆市','双鸭山市','鹤岗市','伊春市','佳木斯市','牡丹江市','七台河市','黑河市','绥化市','安达市','北安市','五大连池市','绥芬河市','阿城市','富锦市','铁力市','密山市','尚志市','大兴安','大兴安岭'],
	
		['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','葫芦岛市','营口市','阜新市','辽阳市','铁岭市','朝阳市','盘锦市','瓦房店市','海城市','北票市','开原市','凌源市','凌海市','铁法市','兴城市','东港市'],
	
		['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延吉市','图们市','公主岭市','梅河口市','敦化市','洮南市','大安市','龙井市','珲春市','德惠市'],
	
		['石家庄市','唐山市','邯郸市','邢台市','保定市','张家口市','承德市','秦皇岛市','沧州市','廊坊市','衡水市','鹿泉市','桃城区','泊头市','辛集市','涿州市','定州市','任丘市','武安市','藁城市','霸州市','安国市','晋州市','遵化市','三河市','冀州市','南宫市','宣化市'],
		['海淀区','东城区','西城区','朝阳区','宣武区','丰台区','通州区','房山区','门头沟区','其它地区','石景山区','昌平区','怀柔区','密云区','崇文区','大兴区','平谷区','顺义区','延庆区'],
	
		['徐汇区','静安区','黄浦区','南市区','闵行区','长宁区','嘉定区','普陀区','宝山区','闸北区','杨浦区','虹口区','浦东新区','崇明县','奉贤县','金山区','卢湾区','松江区','南汇县','青浦县'],
	
		['和平区','河西区','河东区','红桥区','塘沽区','南开区','静海县','武清县','宝坁县','蓟县','大港区','北辰区','西青区','河北区','汉沽区','津南区','东丽区'],
	
		['万州区','江津市','合川区','永川区','南川市','重庆市','涪陵区','秀山区'],
	
		['哈尔滨市','齐齐哈尔市','鸡西市','大庆市','双鸭山市','鹤岗市','伊春市','佳木斯市','牡丹江市','七台河市','黑河市','绥化市','安达市','北安市','五大连池市','绥芬河市','阿城市','富锦市','铁力市','密山市','尚志市','大兴安','大兴安岭'],
	
		['沈阳市','大连市','鞍山市','抚顺市','本溪市','丹东市','锦州市','葫芦岛市','营口市','阜新市','辽阳市','铁岭市','朝阳市','盘锦市','瓦房店市','海城市','北票市','开原市','凌源市','凌海市','铁法市','兴城市','东港市'],
	
		['长春市','吉林市','四平市','辽源市','通化市','白山市','松原市','白城市','延吉市','图们市','公主岭市','梅河口市','敦化市','洮南市','大安市','龙井市','珲春市','德惠市']
	];
	var num = provice_data.length / 4;
	// console.log(num)
	
	for(var j = 0; j < num; j++) {
		// li
		var Lis = document.createElement('li');
		// ol
		var Ols = document.createElement('ol');
	
		Ols.setAttribute('class', 'x_add_detail')
		for(var i = 0; i < 4; i++) {
			// ol 下的 li
			var Olis = document.createElement('li');
			// ol 下的 li 的 a
			var Olisa = document.createElement('a');
	
			Olisa.setAttribute('class', 'x_click');
			Olis.appendChild(Olisa);
			Ols.appendChild(Olis);
			Lis.appendChild(Ols);
			oDiv.appendChild(Lis);
			Olisa.innerHTML = provice_data[ j*4 + i];
		}
	}
	
	var aClick = document.getElementsByClassName('x_click');
	var aTitleTwo = document.getElementsByClassName('x_li_two')[0];
	var aTitleOne = document.getElementsByClassName('x_li_two')[0];
	var aContentOne = document.getElementsByClassName('x_li_ones')[0];
	var aContentTwo = document.getElementsByClassName('x_li_twos')[0];
	for(var i = 0; i < aClick.length; i++) {
		aClick[i].onclick = function() {
			aContentOne.innerHTML = this.innerHTML;
			aTitleTwo.style.display = 'block';
			oDiv.removeChild(Lis);
		}
	}
	
	// 颜色
	$('.x_red').on('click', function() {
		$('.x_red').css({'borderColor' : '#E6E6E6'});
		$('.x_red').children('.x_righticon').children().attr({'src' : ''});
		$(this).css({'borderColor' : '#c00'})
		$(this).children('.x_righticon').children().attr({'src' : '/public/images/bg.png'});
	})
	
	// 倒计时
	var backTime = document.getElementsByClassName('x_group_time')[0];
	
	function checkNum(i) {
		if(i < 10) i = '0' + i;
		return i;
	}
	countDown();
	function countDown() {
		var lastTime = new Date(2018, 7, 31, 23, 59, 59);
		var now = new Date();
		var duration = parseInt((lastTime.getTime() - now.getTime()) / 1000);
		var d = parseInt(duration/24/3600);
		var h = parseInt((duration/3600) % 24);
		var m = parseInt((duration/60) % 60);
		m = checkNum(m);
		var s = parseInt(duration % 60);
		backTime.children[0].innerHTML = d;
		backTime.children[1].innerHTML = h;
		backTime.children[2].innerHTML = m;
		backTime.children[3].innerHTML = s;
	}
	
	setInterval(countDown, 1000);
	
	// 购买数量
	$('.L_reduce').on('click',function(){
		var val = $('.x_buy_num').find('input').val();
		val = val <= 1 ? 2 : --val; 
		$('.x_buy_num').find('input').val(val - 1 );
	})
	$('.L_add').on('click',function(){
		var val = $('.x_buy_num').find('input').val();
		val = parseInt(val);
		$('.x_buy_num').find('input').val(val + 1 );
	})
	
	// 购物车开始
	// 给颜色加索引
	$('.x_red > a').eq(0).attr('index',1)
	$('.x_red > a').on('click',function(){
		$('.x_red > a').attr('index',0);
		$(this).attr('index',1);
	})
	//给套餐加索引
	$('.L_tc').eq(0).attr('index',1);
	$('.L_tc').on('click',function(){
		$('L_tc').attr('index',0);
		$(this).attr('index',1)
	})
	// 定义一个全局的数组
	var arr = [];
	var brr = [];
	// 将事件写入localstorage中
	$('.L_addcat').on('click',function(){
		// 价格
		var pirce = $('#price').html();
		// 颜色
		var color;
		$('.x_red > a').each(function(i){
			if($(this).attr('index') == 1){
				 color = $(this).html();
			}
		})
		// 套餐
		var taozhuang;
		$('.L_tc').each(function(i){
			// alert(1111111111111)
			if($(this).attr('index') == 1){
				// localStorage.setItem('taozhuang',$(this).html())
				taozhuang = $(this).html();
			}
		})
		//商品图片
		var img = $('.x_box img').attr('src');
		// localStorage.setItem('url',img);
		// 商品描述
		var describe = $('.x_good_title').html();
		// localStorage.setItem('describe',describe);
			var count = $('.x_buy_num').find('input').val();

			var newStudents =localStorage.getItem("students");
			if(newStudents){
				newStudents = JSON.parse(newStudents);
				for(var i = 0;i<newStudents.length;i++){
					arr.push(newStudents[i]);
				}

			}else{
				// console.log('没有东西');
			}
		// 购买数量
		var count = $('.x_buy_num').find('input').val();
		
		//商品的id
		var gId = $('#Good_ul').attr('data-gid');
		// console.log(gId);
		var json = {
			pirce:pirce,
			color:color,
			taozhuang:taozhuang,
			url:img,
			describe:describe,
			count:count,
			gid : gId,
			zhekou:'--'
		}
		arr.push(json)
		if(confirm('确定加入购物车？')){
			localStorage.setItem("students",JSON.stringify(arr));
			// 建立ajax请求数据 
			$.ajax({
				type:'post',
				url:'/cat/localStorage',
				data:{
					Students:JSON.stringify(arr),
				},
				dataType:'json',
				success:function (res){
					if(res) {
						window.location.href = '/cat/index'
					}
				}

			})
		}
	
	
	})
})
