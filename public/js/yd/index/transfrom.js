function css(el,attr,val){
		if(!el.transform){
			el.transform={}
		}
		if(arguments.length>2){
			el.transform[attr]=val;
			var transformVal = '';
			for(var s in el.transform){
				switch(s){
					case "translateX":
					case "translatY":
					case "translateZ":
						transformVal+= s+"("+el.transform[s]+"px)";
						break;
					case "rotateX":
					case "rotate":
					case "rotateY":
					case "rotateZ":
					case "skewX":
					case "skewY":
						transformVal += s+"("+el.transform[s]+"deg)";
						break;
					case 'scale':
					case 'scaleY':
					case 'scaleX':
						transformVal += s + "("+el.transform[s]+")"
						break;
				}
			}
			 el.style.transform =el.style.WebkitTransform = transformVal;
		}else{
			val = el.transform[attr];
			if(val == undefined){
				if(attr == 'scale' || attr == 'scaleX' || attr == 'scaleY'){
					val =  1;
				}else{
					val = 0;
				}
			}
			return val;
		}
	}
