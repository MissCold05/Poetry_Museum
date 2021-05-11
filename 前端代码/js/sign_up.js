
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/11/24
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var sign_up_page = new Vue({
		el: "#sign_up_page",
		data: {
			user_name: "",
			user_password: "",
			user_password_confirm: "",
			user_phone_number: "",
			user_verification_code: "",

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
			register() {
			
				if(this.user_name.length == 0) {
					this.tip("先起一个昵称吧", "warning", 300);
					return;
				}
				if(this.user_phone_number.length != 11) {
					this.tip("手机号错误", "warning", 300);
					return;
				}
				if(this.user_verification_code.length != 6) {
					this.tip("请输入正确的验证码", "warning", 300);
					return;
				}
				if(this.user_password != this.user_password_confirm) {
					this.tip("两次输入的密码不相同", "warning", 300);
					return;
				}
				axios.get(http_url + "check", {
					params: {
						pho: this.user_phone_number,
						checkCode: this.user_verification_code
					}
				}).then(response => {
					var answer = response.data;
					if(answer == 1) {
						var formdata = new FormData();
						formdata.append("pho", this.user_phone_number);
						formdata.append("name", "咔咔咔");
						formdata.append("psw", this.user_password);
						formdata.append("type", 1);
						formdata.append("realName", "0");
						formdata.append("idNo", "000000000000000000");
						formdata.append("mail", "0");
						axios.post(http_url + "insertUser", formdata)
						.then( response => {
							var answer = response.data;
							if(answer == 1) {
								setCookie("pre_log_in", "false");
								setCookie("is_log_in", "true");
								setCookie("user_name", this.user_phone_number);
								this.tip("注册成功", "success", 200);
								setTimeout(() => {
									this.new_nav("main");
								}, 1000);
							}
							else {
								this.tip("注册失败", "warning", 300);
							}
						})
						.catch( error => {
							console.log(error);
						});
					}
					else if(answer == -2) {
						this.tip("验证码已过期", "warning", 300);
					}
					else {
						this.tip("验证码错误", "warning", 300);
					}
				}).catch(error => {
					console.log(error);
				});
			},
			about_us(symbol) {
				new_page(symbol, "new");
			}
		},
		filters: {
		}
	});
	document.getElementById("sign_up_page").style.display = "block";
}
