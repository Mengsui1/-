//封装节点轮播图

	function lunbo(oBox,oUl,oPre,oNext,oLis,oLis_o){
		var Width = parseInt(getStyle(oLis[0],'width'));
		var stop = true;
		var num = 0;
		var timer = null;
		timer = setInterval(next,5000);
		oBox.onmouseover = function(){
			clearInterval(timer);
		}
		oBox.onmouseout = function(){
			timer = setInterval(next,5000);
		}
		// 调用函数可以设置ul的宽
		function setWidth(){
			oUl.style.width = oLis.length * Width + 'px';
		}
		setWidth();
		oNext.onclick = next;
		oPre.onclick = pre;
		//小按钮的移入事件
		for (var i = 0; i < oLis_o.length; i++) {
			oLis_o[i].index = i;
			oLis_o[i].onmouseover = function(){
				if(stop){
					This = this;
					stop = false;
					if(num == this.index){
						stop = true;
						return;
					}
					var dis = this.index - num;
					if(dis > 0){
						for (var j = 0; j < dis; j++) {
							var li = oLis[j].cloneNode(true);
							oUl.appendChild(li);
							setWidth();
						};
						move(oUl,{'left':-dis*Width},function(){
							for (var j = 0;  j< dis; j++) {
								oUl.removeChild(oLis[0]);
								setWidth();
							};
							oUl.style.left = 0;
							num = This.index; 
							stop = true;
						});
					}else{
						for (var j = 1; j <= Math.abs(dis); j++) {
							var li = oLis[oLis.length - j].cloneNode(true);
							oUl.insertBefore(li,oLis[0]);
							setWidth();
						};
						oUl.style.left = dis*Width + 'px';
						move(oUl,{'left':0},function(){
							for (var j =1; j <= Math.abs(dis); j++) {
								oUl.removeChild(oLis[oLis.length - 1]);
								setWidth();
							};
							stop = true;
							num = This.index; 
//							console.log(num);
						})
					}
					for (var k = 0; k < oLis_o.length; k++) {
						oLis_o[k].style.background = '#ccc';
					};
					this.style.background = 'red';
				}
			}
		};
		// 下一张，ul向左
		function next(){
			if(stop){
				num ++;
				// num = num%oLis.length;
				if(num == oLis.length){
					num = 0;
				}
				for (var k = 0; k < oLis_o.length; k++) {
					oLis_o[k].style.background = '#ccc';
				};
				oLis_o[num].style.background = 'red';
				stop = false;
				var li = oLis[0].cloneNode(true);
				oUl.appendChild(li);
				setWidth();
				move(oUl,{'left':-Width},function(){
					oUl.removeChild(oLis[0]);
					oUl.style.left = 0;
					stop = true;
				});
			}
		}
		// 上一张，ul向右
		function pre(){
			if(stop){
				num--;
				// num = num%oLis.length;
				if(num < 0){
					num = oLis.length - 1;
				}
				for (var k = 0; k < oLis_o.length; k++) {
					oLis_o[k].style.background = '#ccc';
				};
				oLis_o[num].style.background = 'red';
				stop = false;
				var li = oLis[oLis.length - 1].cloneNode(true);
				oUl.insertBefore(li,oLis[0]);
				setWidth();
				oUl.style.left = -Width + 'px';
				move(oUl,{'left':0},function(){
					oUl.removeChild(oLis[oLis.length - 1]);
					stop = true;
				})
			}
		}
	}