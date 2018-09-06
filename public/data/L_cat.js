window.onload=function(){
	var newStudents =localStorage.getItem("students");
	var newStudents2 =localStorage.getItem("students2");
	newStudents = JSON.parse(newStudents);
	newStudents2 = JSON.parse(newStudents2);
	var sendsum = '';
	var app = new Vue({
	delimiters: ['${', '}'],
	el: '#app',
	data:{
		list:newStudents,
		list2:newStudents2,
		selectList:[],//定义用户操作列表
        checked: false,
	},
	computed:{
		// 计算总价
		total(){
			var length = this.selectList.length;
			var sum = 0;
			for(i = 0 ; i <length; i++){
				var index = this.selectList[i];//v-model会自动获取value的值
				// var singleGood = this.list[index];
				sum += this.list[index].pirce * this.list[index].count;
			}
			return sum.toString();

		},
		// 定义提交后的价格
		total2(){
			var newStudents2 =localStorage.getItem("students2");
			newStudents2 = JSON.parse(newStudents2);
			var sum = 0;
			var length = newStudents2.length;
			for(var i = 0;i<newStudents2.length;i++){
				// localStorage.setItem('aa',JSON.stringify(newStudents2[i].pirce))
				sum += newStudents2[i].pirce * newStudents2[i].count;
			}
			sendsum = sum.toString()
			return sum.toString();


		},
		zhuangtai(){
			
			return this.list.length;
		}
	},
	methods:{
		// 定义价格
		jiage(index){
			var sum = 0;
			var num = this.list[index];
			sum = num.count * num.pirce;
			var zhekou = num.zhekou == '--' ? 1:num.zhekou;
			sum = sum * zhekou;
			return sum
		},
		// 定义减
		reduce(index){
			var num = this.list[index];
			if(num.count < 2){
				return;
			}
			num.count--;
		},
		// 定义加
		add(index){
			var num = this.list[index];
			num.count++;
		},
		// 全选
		all(){
			var selectList = document.getElementsByName('selectList');
			var length = selectList.length;
			// alert(this.checked)
			if(this.checked){
				// 状态为true点击的时候取消全选
				for(var i = 0 ;i<length;i++){
					selectList[i].style.checkbox = false;
				}
				this.checked = false;
				this.selectList = [];
			}else{
				// 状态为false点击的时候全选
				for(var i = 0 ;i<length;i++){
					selectList[i].style.checkbox = true;
					this.selectList.push(selectList[i].value);
				}
				this.checked = true;				
			}
		},
		
		// 定义删除
		remove(index){
			this.list.splice(index, 1);
			newStudents.splice(index,1);
			localStorage.setItem('students',JSON.stringify(newStudents));
			if(this.list.length == 0){
				localStorage.removeItem("students"); 
				$.ajax({
					type:'post',
					url:'/cat/localStorage',
					data:{
						Students:'',
					},
					dataType:'json',
					success:function (res){
						 window.location.reload();
					}
				})
			}

		},
		// 定义批量删除
		allRemove(){

			var selectAll = document.getElementsByName('selectAll')[0];
			var length = this.selectList.length;
			var index = [];
			if(length != 0){
				for(var i = 0;i<length;i++){
					index.push(this.selectList[i])
				}
				
			}
			// 对数组进行排序
			index = index.sort();
			for(var i = index.length-1 ;i >= 0;i--){
				// 从后往前删 避免数组长度的变化
				this.list.splice(index[i], 1);
				newStudents.splice(index,1);
				localStorage.setItem('students',JSON.stringify(newStudents));
				if(this.list.length == 0){
					localStorage.removeItem("students"); 
					$.ajax({
						type:'post',
						url:'/cat/localStorage',
						data:{
							Students:'',
						},
						dataType:'json',
						success:function (res){
							 window.location.reload();
						}
					})
				}

			}
			// console.log(selectAll)
			
			this.selectList = [];
			this.checked = false;


		},
		sendorder() {
			if(this.selectList.length == 0){
				alert('列表为空');
				return;
			}
			localStorage.setItem('students',JSON.stringify(this.list));
			// 点击提交的时候将购物车的信息写到本地中区
			var length = this.selectList.length;
			var arr = new Array()
			for(var i=0;i<length;i++){
				arr.push(this.list [ this.selectList[i] ])
			}
			localStorage.setItem('students2',JSON.stringify(arr));

			$.ajax({
				type:'post',
				url:'/cat/sendorder',
				data:{
					newstudent : newStudents
				},
				dataType:'json',
				success:function (res){
//					console.log(res)
					if(res) {
						window.location.href="/cat/jiesuan";
					}
					 
				}
			})
		}
	},
	mounted(){
		this.all()
	}

});



}
