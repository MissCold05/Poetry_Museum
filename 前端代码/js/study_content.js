
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/12/11
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var study_content_page_nav = new Vue({
		el: "#study_content_page_nav",
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
	var study_content_page_title = new Vue({
		el: "#study_content_page_title",
		data: {
			titles: [],
			title_library: [
				[],
				["概述", "诗经：多彩的古人生活画卷"],
				["丰富多彩的两汉乐府诗", "东汉文人诗", "游子之歌：《古诗十九首》"],
				["概述", "建安风骨", "阮籍、嵇康与正始诗歌", "两晋诗坛", "田园诗人陶渊明", "南北朝民歌", "南朝诗风的演变"],
				["概述", "初唐诗坛", "盛唐兴象", "诗仙李白", "诗圣杜甫", "韩孟诗派", "元白诗派", "晚唐诗歌", "李商隐"],
				["概述", "北宋前期：\"三体\"兴盛", "诗坛的革新派", "王荆工体", "宋诗大家——苏轼", "江西诗派", "辽诗文化"],
				["永嘉四灵", "江湖诗派", "诗坛英雄", "金诗文化"]
			]
		},
		methods: {
			set_titles() {
				this.titles = this.title_library[getCookie("chapter")];
			},
			set_section(index) {
				setCookie("section", index + 1);
				new_page("study_content", "this");
			}
		},
		filter: {
		}
	});
	var study_content_page_content = new Vue({
		el: "#study_content_page_content",
		data: {
			label: 1,
			knowledge_points: [],
			quiz: [],
			advice: ""
		},
		methods: {
			set_knowledge_points() {
				axios.get(http_url + "getSection", {
					params: {
						chapter: getCookie("chapter"),
						section: getCookie("section")
					}
				}).then(response => {
					var answer = response.data;
					var knowledge_points = [];
					for(index in answer) {
						var knowledge_point = {};
						knowledge_point.no = answer[index].no;
						knowledge_point.title = answer[index].title;
						knowledge_point.content = answer[index].content.split("\r\n");
						knowledge_point.has_problem = answer[index].haveProblem == 1;
						knowledge_points.push(knowledge_point);
					}
					this.knowledge_points = knowledge_points;
				}).catch(error => {
					console.log(error);
				});
			},
			set_quiz() {
				axios.get(http_url + "getAllMyProblem", {
					params: {
						chapter: getCookie("chapter"),
						section: getCookie("section")
					}
				}).then(response => {
					var answer = response.data;
					var quiz = [];
					for(index in answer) {
						var problem = {};
						problem.type = answer[index].type;
						problem.content = answer[index].content;
						problem.options = answer[index].options;
						problem.answer = answer[index].answer;
						problem.selection = -1;
						if(problem.type == 2)problem.options = ["正确", "错误"];
						if(problem.type != 3)quiz.push(problem);
					}
					this.quiz = quiz;
				}).catch(error => {
					console.log(error);
				});
			},
			submit_advice() {
				const h = this.$createElement;
				this.$notify({
					title: "提示",
					message: h("i", {style: "color:#BD2224"}, "您的意见已收到，感谢反馈！")
				});
			},
			submit_answer(answer) {
				this.$alert("正确答案为：" + answer, "提示", {
				confirmButtonText: "我知道啦",
				});
			}
		},
		filter: {
		}
	});

	document.getElementById("start").click();
	study_content_page_title.set_titles();
	study_content_page_content.set_knowledge_points();
	study_content_page_content.set_quiz();
	document.getElementById("study_content_page").style.display = "block";

	setInterval(() => {
		if(getCookie("is_log_in") == "true") {
			study_content_page.is_log_in = true;
			if(getCookie("pre_log_in") == "false") {
				setCookie("pre_log_in", "true");
				study_content_page.is_log_in = true;
			}
		}
		else {
			study_content_page.is_log_in = false;
		}
		var content_list = document.querySelector("section.active");
		study_content_page_content.label = content_list.id[3] - '0';

	}, 300);
}
