
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/12/02
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var grade_content_page = new Vue({
		el: "#grade_content_page",
		data: {
			is_log_in: false,
			value: null,
			rate: ['A','B','C','D','E'],
			textarea: '',
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
			submit_rate() {
				const h = this.$createElement;
				this.$notify({
					title: '消息提示',
					message: h('i', { style: 'color:#409EFF'}, '评分成功！感谢您的参与！')
				});
			},
			submit_commit() {
				const h = this.$createElement;
				this.$notify({
					title: '消息提示',
					message: h('i', { style: 'color:#409EFF'}, '您的评论已提交，请等待审核，感谢您的参与！')
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
			grade_content_page.is_log_in = true;
			if(getCookie("pre_log_in") == "false") {
				setCookie("pre_log_in", "true");
				grade_content_page.is_log_in = true;
			}
		}
		else {
			grade_content_page.is_log_in = false;
		}
	}, 300);

	// red heart
	$('body').on("click", '.heart', function() {
		var A = $(this).attr("id");
		var B = A.split("like");
		var messageID = B[1];
		var C = parseInt($("#likeCount" + messageID).html());
		$(this).css("background-position", "");
		var D = $(this).attr("rel");
		if(D === 'like') {      
			$("#likeCount" + messageID).html(C + 1);
			$(this).addClass("heartAnimation").attr("rel", "unlike");
		}
		else {
			$("#likeCount" + messageID).html(C - 1);
			$(this).removeClass("heartAnimation").attr("rel", "like");
			$(this).css("background-position", "left");
		}
	});

	// auto flow
	var custom = new scrollbot(".custom-scroll");
	document.onreadystatechange = function() {
		custom.refresh();
	}
	document.getElementById("grade_content_page").style.display = "block";
};
