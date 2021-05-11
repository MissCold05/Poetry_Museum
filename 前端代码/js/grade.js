
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/11/28
Version : 0.1
All Rights Reserved.
*/



window.onload = function() {
	var grade_page_nav = new Vue({
		el: "#grade_page_nav",
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
	var grade_page_sidebar = new Vue({
		el: "#grade_page_sidebar",
		data: {
			months: ["岁始 | January", "春中 | February", "季春 | March", "夏首 | April", "仲夏 | May", "季夏 | June", "桐秋 | July", "清秋 | August", "凉秋 | September", "新冬 | October", "仲冬 | November", "暮冬 | December"],
			years: [
				{ year: 2020, month: [] },
				{ year: 2019, month: [] }
			]
		},
		methods: {
			up_down(index) {
				var len = this.years[index].month.length;
				if(len == 12) {
					this.years[index].month = [];
				}
				else {
					this.years[index].month = [];
					var i = 0;
					var intervalId = setInterval(() => {
						if(i < 12) {
							this.years[index].month.push(this.months[i++]);
						}
						else {
							setTimeout(() => {
								clearInterval(intervalId);
							}, 300)
						}
					}, 20);
				}
			}
		},
		filter: {
		}
	});
	setInterval(function(){
		if(getCookie("is_log_in") == "true") {
			grade_page_nav.is_log_in = true;
			if(getCookie("pre_log_in") == "false") {
				setCookie("pre_log_in", "true");
				grade_page_nav.is_log_in = true;
			}
		}
		else {
			grade_page_nav.is_log_in = false;
		}
	}, 300);
	document.getElementById("grade_page").style.display = "block";
};
