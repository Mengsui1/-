function move(obj,json,callBack){
	var speed = 0;
	clearInterval(obj.timer);
	obj.timer = setInterval(go,20);
	function go(){
		var css = 0;
		var stop = true;
		for(var attr in json){
			if(attr == 'opacity'){
				css = (getStyle(obj,attr))*100;
			}else{
				css = parseInt(getStyle(obj,attr));
			}
			speed = (json[attr] - css) / 7;
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

			if( Math.abs(json[attr] - css) > 1 ){
				stop = false;
				if(attr == 'opacity'){
					obj.style.opacity = (css + speed)/100;
					obj.style.filter = 'alpha( opacity='+ (css + speed) +' )';
				}else{
					obj.style[attr] = css + speed + 'px';
				}
			}
		}
		if(stop){
			clearInterval(obj.timer);
			if(typeof callBack == 'function'){
				callBack();
			}
		}
	}
}
function getStyle(obj,attr){
	return obj.currentStyle ? obj.currentStyle[attr] : getComputedStyle(obj)[attr];
}