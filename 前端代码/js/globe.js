
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/12/03
Version : 0.1
All Rights Reserved.
*/

/*
This file contains basic global variables and functions.
Dependencies are as follows.
```
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/element-ui/lib/index.js"></script>
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>

```
Do not forget to add these codes to html files as configuration.
*/

active = "pro";

http_url = "http://ecnuer.top:8080/";

pages = {
	"main": "main.html",
	"search": "search.html",
	"sign_up": "sign_up.html",
	"log_in": "log_in.html",
	"home": "home.html",
	"grade_index": "grade_index.html",
	"grade_content": "grade_content.html",
	"college_index": "college_index.html",
	"college_content": "college_content.html",
	"exam_index": "exam_index.html",
	"exam_content": "exam_content.html",
	"study_index": "study_index.html",
	"study_content": "study_content.html",
	"langhuan": "langhuan/index.html",
	"binghe": "binghe/index.html",
	"nanshan": "nanshan/index.html",
	"hanzhang": "hanzhang/index.html",

	"eth": "http://amiya.vip",
	"rwn": "http://amiya.vip",
	"jgl": "https://baidu.com",
	"lcl": "https://baidu.com"
};

setCookie = function(name, value) {
	document.cookie = name + "=" + value;
};

getCookie = function(name) {
	var cookies = document.cookie.split(";");
	for(var i = 0;i < cookies.length;++i) {
		var cookie = cookies[i].split("=");
		if(cookie[0].trim() == name) {
			return cookie[1];
		}
	}
	return "";
};

new_page = function(symbol, type) {
	if(type == "this") {
		window.location.href = pages[symbol];
	}
	else if(type == "new") {
		window.open(pages[symbol]);
	}
};

log_out = function() {
	setCookie("is_log_in", "false");
};
