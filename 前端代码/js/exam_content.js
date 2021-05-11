
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/12/06
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var exam_content_page = new Vue({
		el: "#exam_content_page",
		data: {
			is_log_in: false,
			countdown_seconds: 300,
			countdown_time: "",
			score: 0,
			quiz: []
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

			submit() {
				this.$confirm('交卷后今天将不能再次答题，是否交卷?', '提示', {
					confirmButtonText: '现在交卷',
					cancelButtonText: '再想想',
					type: 'info'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '提交成功',
						offset: 280
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消提交',
						offset: 280
					});
				});
				for(index in this.quiz) {
					var grade = 0;
					var problem = this.quiz[index];
					if(problem.std.charCodeAt(0) - 65 === problem.answer)grade += 20;
					this.score = grade;
				}
				setTimeout(() => {
					if(this.score >= 80) {
						this.$alert('恭喜通过，您的得分为' + this.score, '结果', {
							confirmButtonText: '确定',
							callback: action => {
								this.new_nav("exam_index");
							}
						});
					}
					else {
						this.$alert('很遗憾，您的得分为' + this.score, '结果', {
							confirmButtonText: '确定',
							callback: action => {
								this.new_nav("exam_index");
							}
					});
					}
				}, 5000);
			},


			get_countdown_time() {
				var m = Math.floor(this.countdown_seconds / 60);
				var s = this.countdown_seconds % 60;
				return "0" + String(m) + ":" + (s > 9 ? "" : "0") + String(s);
			},

			about_us(symbol) {
				new_page(symbol, "new");
			}
		},
		filter: {
		}
	});

	axios.get(http_url + "getPartMyProblem", {
		params: {
			chapter: getCookie("chapter"),
			section: getCookie("section"),
			type: 1
		}
	}).then(response => {
		var answer = response.data;
		var problems = [];
		for(index in answer) {
			if(answer.length - index > 5)continue;
			var problem = {};
			problem.type = "select";
			problem.statement = answer[index].content;
			problem.options = answer[index].options;
			problem.answer = "";
			problem.std = answer[index].answer;
			problems.push(problem);
		}
		exam_content_page.quiz = problems;
	}).catch(error => {
		console.log(error);
	});

	var timerId = setInterval(() => {
		var that = exam_content_page;
		if(that.countdown_seconds-- == 0)that.countdown_seconds = 0;
		that.countdown_time = that.get_countdown_time(that.countdown_seconds);
		setTimeout(() => {
			clearInterval(timerId);
		}, 300000)
	}, 1000);
	setInterval(() => {
		if(getCookie("is_log_in") == "true") {
			exam_content_page.is_log_in = true;
			if(getCookie("pre_log_in") == "false") {
				setCookie("pre_log_in", "true");
				exam_content_page.is_log_in = true;
			}
		}
		else {
			exam_content_page.is_log_in = false;
		}
	}, 300);
	window.jQuery || document.write("<script src='js/jquery.min.js'><\/script>");
	document.getElementById("exam_content_page").style.display = "block";
};
