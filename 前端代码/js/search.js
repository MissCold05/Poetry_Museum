
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/11/26
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var search_page = new Vue({
		el: "#search_page",
		data: {
			is_log_in: false,
			is_box_display: false,

			user_input_content: "",
			user_input_name: "",
			user_input_title: "",

			result_display: false,
			result_title: "",
			result_content: ""
		},
		methods: {
			new_nav(symbol) {
				new_page(symbol, "this");
			},
			log_out() {
				log_out();
			},
			change_box_display() {
				this.is_box_display = !this.is_box_display;
				if(this.is_box_display) {
					document.getElementById("intro_p").style.display = "block";
				}
				else {
					document.getElementById("intro_p").style.display = "none";
				}
			},
			search_by_name() {
				this.result_display = false;
				this.result_title = "";
				this.result_content = "";
				document.getElementById("intro_q").innerHTML = "";
				axios.get(http_url + "newGetPoet", {
					params:{
						name: this.user_input_name
					}
				}).then(response => {
					var answer = response.data;
					this.result_title = answer.poet;
					this.result_content = answer.content;
				}).catch(error => {
					console.log(error);
				});
				if(this.result_content == "") {
					axios.get(http_url + "newGetPoem", {
						params:{
							name: this.user_input_name
						}
					}).then(response => {
						var answer = response.data;
						this.result_title = answer.title;
						var subtitle = "——(" + answer.dynasty + ")" + answer.author + "--";
						var content = answer.content.replace(/。/gu,"。-") + "-" + answer.background;
						var html = subtitle + content;
						if(html.length < 15)html = "";
						document.getElementById("intro_q").innerHTML = html.replace(/-/g,"<br/>");
					}).catch(error => {
						console.log(error);
					});
				}
				this.user_input_content = "";
				this.user_input_name = "";
				this.user_input_title = "";
				this.result_display = true;
			},
			search_by_content() {
				this.result_display = false;
				this.result_title = "";
				this.result_content = "";
				document.getElementById("intro_q").innerHTML = "";
				axios.get(http_url + "newGetPoet", {
					params:{
						name: this.user_input_content
					}
				}).then(response => {
					var answer = response.data;
					this.result_title = answer.poet;
					this.result_content = answer.content;
				}).catch(error => {
					console.log(error);
				});
				this.user_input_content = "";
				this.user_input_name = "";
				this.user_input_title = "";
				this.result_display = true;
			},
			search_by_title() {
				this.result_display = false;
				this.result_title = "";
				this.result_content = "";
				axios.get(http_url + "newGetPoem", {
					params:{
						name: this.user_input_title
					}
				}).then(response => {
					var answer = response.data;
					this.result_title = answer.title;
					var subtitle = "——(" + answer.dynasty + ")" + answer.author + "--";
					var content = answer.content.replace(/。/gu,"。-") + "-" + answer.background;
					var html = subtitle + content;
					if(html.length < 15)html = "";
					document.getElementById("intro_q").innerHTML = html.replace(/-/g,"<br/>");
				}).catch(error => {
					console.log(error);
				});
				this.user_input_content = "";
				this.user_input_name = "";
				this.user_input_title = "";
				this.result_display = true;
			}
		},
		filters: {
		}
	});
	setInterval(function(){
		if(getCookie("is_log_in") == "true") {
			search_page.is_log_in = true;
			if(getCookie("pre_log_in") == "false") {
				setCookie("pre_log_in", "true");
				search_page.is_log_in = true;
			}
		}
		else {
			search_page.is_log_in = false;
		}
	}, 300);
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
	document.getElementById("search_page").style.display = "block";
}
