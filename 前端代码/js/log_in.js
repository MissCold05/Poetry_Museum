
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/11/27
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var log_in_page = new Vue({
		el: "#log_in_page",
		data: {
			user_name: "18250337185",
			user_password: "123456",
			user_phone_number: "",
			user_verification_code: "",

			is_password_login: true,

			countdown_seconds: 0,
			countdown_seconds_appear: false
		},
		methods: {
			new_nav(symbol) {
				new_page(symbol, "this");
			},
			tip(info, style, pos) {
				this.$message({
					message: info,
					type: style,
					offset: pos
				});
			},
			log_in() {
				var key = this.is_password_login ? this.user_name : this.user_phone_number;
				var value = this.is_password_login ? this.user_password : this.user_verification_code;
				var formdata = new FormData();
				formdata.append("pho", key);
				formdata.append("psw", value);
				axios.post(http_url + "login", formdata)
				.then( response => {
					var answer = response.data;
					if(answer == 1) {
						setCookie("pre_log_in", "false");
						setCookie("is_log_in", "true");
						setCookie("user_name", key);
						this.tip("登录成功", "success", 200);
						setTimeout(() => {
							this.new_nav("main");
						}, 1000);
					}
					else {
						this.tip("登录失败", "warning", 300);
					}
				})
				.catch( error => {
					console.log(error);
				});
			},
			turn_password_login() {
				this.is_password_login = true;
			},
			turn_verification_login() {
				this.is_password_login = false;
			},
			count_down() {
				if(this.countdown_seconds_appear) {
					return;
				}
				if(this.user_phone_number.length != 11) {
					this.tip("手机号错误", "warning", 300);
					return;
				}
				axios.get(http_url + "register", {
					params: {
						pho: this.user_phone_number
					}
				}).then(response => {
					this.tip("验证码发送成功", "success", 300);
					console.log(response.data);
				}).catch(error => {
					console.log(error);
				});
				this.countdown_seconds = 60;
				this.countdown_seconds_appear = true;
				timerId = setInterval(() => {
					if(--this.countdown_seconds == 0) {
						this.countdown_seconds_appear = false;
					}
				}, 1000);
				setTimeout(() => {
					this.countdown_seconds_appear = false;
					clearInterval(timerId);
				}, 60000);
			},
			
		},
		filters: {
		}
	});
	$(document).ready(function() {
		try {
			$('body').ripples({
				resolution: 512,
				dropRadius: 20,
				perturbance: 0.04,
			});
			$('main').ripples({
				resolution: 128,
				dropRadius: 10,
				perturbance: 0.04,
				interactive: false
			});
		}
		catch (e) {
			$('.error').show().text(e);
		}
		$('.js-ripples-disable').on('click', function() {
			$('body, main').ripples('destroy');
			$(this).hide();
		});
		$('.js-ripples-play').on('click', function() {
			$('body, main').ripples('play');
		});
		$('.js-ripples-pause').on('click', function() {
			$('body, main').ripples('pause');
		});
		setInterval(function() {
			var $el = $('main');
			var x = Math.random() * $el.outerWidth();
			var y = Math.random() * $el.outerHeight();
			var dropRadius = 20;
			var strength = 0.04 + Math.random() * 0.04;
			$el.ripples('drop', x, y, dropRadius, strength);
		}, 400);
	});
	document.getElementById("log_in_page").style.display = "block";
}
