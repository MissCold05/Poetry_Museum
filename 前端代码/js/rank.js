
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/11/28
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var home_page = new Vue({
		el: "#rank_page",
		data: {
			is_log_in: false
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
			log_out() {
				log_out();
			},
			about_us(symbol) {
				new_page(symbol, "new");
			}
		},
		filter: {
		}
	});
	setInterval(function(){
		if(getCookie("is_log_in") == "true") {
			rank_page.is_log_in = true;
			if(getCookie("pre_log_in") == "false") {
				setCookie("pre_log_in", "true");
				rank_page.is_log_in = true;
			}
		}
		else {
			rank_page.is_log_in = false;
		}
	}, 300);
	window.jQuery || document.write("<script src='js/jquery.min.js'><\/script>");
	$(function() {
		$("#da-slider").cslider();
	});
	$(document).ready(function(){
		$('.counter-value').each(function(){
			$(this).prop('Counter',0).animate(
				{
					Counter: $(this).text()
				},
				{
					duration: 3500,
					easing: 'swing',
					step: function (now){
						$(this).text(Math.ceil(now));
					}
				}
			);
		});
	});
	document.getElementById("rank_page").style.display = "block";
};
