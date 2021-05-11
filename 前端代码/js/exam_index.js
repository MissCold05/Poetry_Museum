
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/12/06
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var exam_index_page = new Vue({
		el: "#exam_index_page",
		data: {
			is_log_in: false,
			rule_visible: false
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
			start_quiz(index) {
				if(index == 0) {
					setCookie("chapter", 1);
					setCookie("section", 2);
				}
				else if(index == 1) {
					setCookie("chapter", 2);
					setCookie("section", 1);
				}
				else if(index == 2) {
					setCookie("chapter", 2);
					setCookie("section", 3);
				}
				else if(index == 3) {
					setCookie("chapter", 4);
					setCookie("section", 2);
				}
				this.new_nav('exam_content');
			},
			rule_close_confirm(done) {
				this.confirm("确认关闭？").then(_ => {
					done();
				}).catch(_ => {});
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
			exam_index_page.is_log_in = true;
			if(getCookie("pre_log_in") == "false") {
				setCookie("pre_log_in", "true");
				exam_index_page.is_log_in = true;
			}
		}
		else {
			exam_index_page.is_log_in = false;
		}
	}, 300);
	window.jQuery || document.write("<script src='js/jquery.min.js'><\/script>");
	document.getElementById("exam_index_page").style.display = "block";
};
