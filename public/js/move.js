
//封装运动函数
function move (obj,json,fn){
		// 定时器 要先清再开
		clearInterval(obj.timer);
		obj.timer = setInterval(function(){
			var stop = true;
			for(var attr in json){
				// attr == '属性'
				// json[attr]  目标值
				
				// 速度= (目标值 - 当前值)/系数
				var objAttr = 0;  //当前值
				if( attr == 'opacity'){
						objAttr = getStyle(obj,attr)*100
					}else{
						objAttr = parseInt(getStyle(obj,attr));
					}
					// 速度
					var speed = (json[attr] - objAttr)/3;
					speed = speed>0 ? Math.ceil(speed) :Math.floor(speed);

					if(json[attr]!=objAttr){
						stop = false;
						if(attr == 'opacity'){
							// 进行赋值
							obj.style[attr] = (objAttr + speed)/100;
						}else{
							// 进行赋值
							obj.style[attr] = objAttr + speed +"px";
						}
					}
				}
				if(stop){
					clearInterval(obj.timer)
					fn && fn(); 
				}
			
		},30)	
	}
function getStyle(obj,attr){
		return obj.currentStyle?obj.currentStyle[attr]:getComputedStyle(obj)[attr];
	}


