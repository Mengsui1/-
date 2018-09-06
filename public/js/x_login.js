// alert(1)
$(function(){
	var W_shang = document.getElementById('W_shang');
	var W_jia = document.getElementById('W_jia');
	var W_pubLogin = document.getElementsByClassName('W_lmb_bOne');
	var W_pubLoginOne = document.getElementsByClassName('W_lmb_bOne_t');
	W_shang.addEventListener('click', function() {
		this.setAttribute('class', 'W_login_active');
		W_jia.removeAttribute('class');
		W_pubLogin[0].style.display = 'block';
		W_pubLogin[1].style.display = 'none';
	}, false);
	W_jia.addEventListener('click', function() {
		this.setAttribute('class', 'W_login_active');
		W_shang.removeAttribute('class');
		W_pubLogin[1].style.display = 'block';
		W_pubLogin[0].style.display = 'none';
	}, false);
	
	for(var i = 0; i < W_pubLoginOne.length; i++) {
		var W_input = W_pubLoginOne[i].getElementsByTagName('input');
		for(var j = 0; j < W_input.length; j++) {
			W_input[j].onfocus = function() {
				this.style.borderColor = '#c00';
			};
			W_input[j].onblur = function() {
				this.style.borderColor = '#ccc';
			};
		}
	
	}
	// 登录检验
	$('#loginB').on('click', function() {
		$.ajax({
			type: "post",
			url: "/api/logins",
			data: {
				loginUsername: $('#x_login_username').val(),
				loginPassword: $('#x_login_password').val()
			},
			dataType: 'json',
			success: function(resData) {
				switch(resData.code) {
					case 1:
						$('.W_login_wrong').css({
							display: 'block'
						});
						$('.W_login_wrong').html('用户名或密码不能为空');
						break;
					case 2:
						$('.W_login_wrong').css({
							display: 'block'
						});
						break;
					case 3:
						alert('成功')
						$('.W_login_wrong').css({
							display: 'none'
						});
						window.location.href = "/index";
						break;
				}
			}
		})
	});

});