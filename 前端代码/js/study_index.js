
window.onload = function() {
	var study_index_page_header = new Vue({
		el: "#study_index_page_header",
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
				new_page("main", "this");
			}
		},
		filters: {
		}
	});

	$(document).ready(function (ev) {
		var toggle = $("#ss_toggle");
		var menu = $("#ss_menu");
		var rot;
		$("#ss_toggle").on("click", function (ev) {
			rot = parseInt($(this).data("rot")) - 180;
			menu.css("transform", "rotate(" + rot + "deg)");
			menu.css("webkitTransform", "rotate(" + rot + "deg)");
			if(rot / 180 % 2 == 0) {
				toggle.parent().addClass("ss_active");
				toggle.addClass("close");
			}
			else {
				toggle.parent().removeClass("ss_active");
				toggle.removeClass("close");
			}
			$(this).data("rot", rot);
		});
		menu.on("transitionend webkitTransitionEnd oTransitionEnd", function() {
			if (rot / 180 % 2 == 0) {
				$("#ss_menu div i").addClass("ss_animate");
			}
			else {
				$("#ss_menu div i").removeClass("ss_animate");
			}
		});
	});

	for(let i = 1;i <= 6;++i) {
		document.getElementById(i).onclick = () => {
			setCookie("chapter", i);
			setCookie("section", 1);
			new_page("study_content", "this");
		}
	}
	setInterval(function(){
		if(getCookie("is_log_in") == "true") {
			study_index_page_header.is_log_in = true;
			var avatar_url = "https://poetry0.oss-accelerate.aliyuncs.com/images/demo/avatar.jpg";
			document.getElementById("nav_avatar").src = avatar_url;
		}
		else {
			study_index_page_header.is_log_in = false;
		}
	}, 300);
}
