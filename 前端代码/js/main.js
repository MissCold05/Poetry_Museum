
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/11/28
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var main_page = new Vue({
		el: "#main_page",
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
			main_page.is_log_in = true;
			var avatar_url = "https://poetry0.oss-accelerate.aliyuncs.com/images/demo/avatar.jpg";
			document.getElementById("nav_avatar").src = avatar_url;
		}
		else {
			main_page.is_log_in = false;
		}
	}, 300);
	var $cont = document.querySelector('.cont');
	var $elsArr = [].slice.call(document.querySelectorAll('.el'));
	var $closeBtnsArr = [].slice.call(document.querySelectorAll('.el__close-btn'));
	setTimeout(function() {
		$cont.classList.remove('s--inactive');
	}, 200);
	$elsArr.forEach(function ($el) {
		$el.addEventListener('click', function() {
			if(this.classList.contains('s--active'))return;
			$cont.classList.add('s--el-active');
			this.classList.add('s--active');
		});
		$el.addEventListener('keypress', function(e) {
			if(this.classList.contains('s--active'))return;
			if(e.which !== 13)return;
			$cont.classList.add('s--el-active');
			this.classList.add('s--active');
		});
	});
	$closeBtnsArr.forEach(function($btn) {
		$btn.addEventListener('click', function(e) {
			e.stopPropagation();
			$cont.classList.remove('s--el-active');
			document.querySelector('.el.s--active').classList.remove('s--active');
		});
		$btn.addEventListener('keypress', function(e) {
			if(e.which !== 13)return;
			e.stopPropagation();
			$cont.classList.remove('s--el-active');
			document.querySelector('.el.s--active').classList.remove('s--active');
		});
	});
	document.getElementById("main_page").style.display = "block";
};
