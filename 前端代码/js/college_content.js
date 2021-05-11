
window.onload = function() {
	var college_content_page_body = new Vue({
		el: "#college_content_page_body",
		data: {
			state: 0,
			rank: [
				{ name: "张牧之", title: "秀才", grade: 654 },
				{ name: "青瓷", title: "童生", grade: 345 },
				{ name: "马走日", title: "举人", grade: 485 },
				{ name: "唐雨林", title: "贡士", grade: 445 },
				{ name: "蓝青峰", title: "举人", grade: 635 },
				{ name: "关巧红", title: "举人", grade: 75 },
				{ name: "武六", title: "举人", grade: 95 },
				{ name: "崔中石", title: "举人", grade: 125 },
				{ name: "梅长苏", title: "举人", grade: 345 }
			]
		},
		methods: {
			sort_by_grade() {
				this.rank.sort((a, b) => {return b.grade - a.grade});
			}
		}
	});

	setInterval(() => {
		college_content_page_body.state = getCookie("college");
	}, 300);

	document.getElementById("college_content_page").style.display = "block";
}
