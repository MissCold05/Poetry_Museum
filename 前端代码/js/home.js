
/*
Author	: @Rowena_Zhang @Ethereality
Date	: 2020/09/27
Version : 0.1
All Rights Reserved.
*/

window.onload = function() {
	var home_page = new Vue({
		el: "#home_page",
		data: {
			is_log_in: true,
			state: 5,
			blogs: [
				{
					title: "观史有感",
					content: [
						"余尝观春秋，战国之史，浅有所得，一为史得，一为心得。",
						"史得者，纵观春秋战国，是时也，虽无天下一统之大观，亦无江山万里之雄姿，然人之才皆可用，人之志尽可酬，不乏溢才忠贞之士，且有决断圣明之君，故乱世出英雄也，始皇以后，江山社稷，黎民百姓，福祸皆系于一人之手，若有贤君尚可，倘遇庸主，岂可得哉！",
						"心得者，窃以为古人重义也。道不同者，虽不相为谋，然可为彼所赏识，如苏秦，张仪之属，一欲合纵，一欲连横，然二人皆出于鬼谷先生门下，朝堂之上，忠之君异，后之视也，当针锋相对，然二者惺惺相惜，苏秦自以不如张仪，张仪穷困之时，苏秦感怒之，仪以己见辱，乃遂入秦，第不知此皆为苏秦之知遇之恩也！余尝闻君子之交淡如水，观此二人之交，乃得其要义。"
					]
				},
				{
					title: "《伪梁史-列传第二十一》",
					content: [
						"苏哲，滁州琅琊人。哲大才，未逾而立，名满江左，或以“麒麟才子”称之。初，帝为靖王，在潜邸，尝与哲游，引为至交，后值北境烽火，国无将，群臣束手，帝欲亲往，哲以白衣之身自请执帝符行令，未逾三月，雁鸣关大捷，哲筑北境防线，整长林军，班师还，授紫金光禄大夫，加封太子太保，万和三年，帝废相制，设内阁，擢为首辅大学士，掌内阁事。哲性淡泊，不好交接，居则自处，未有结党，帝眷哲厚，时召对便殿，称“先生”不名。四十九年，以病卒，帝哀毁，天下士子，哭临三日，皆释服，谥“文正”。",
						"哲为江左白衣时，声绩表著，卓然负经世之才，及时势艰虞，解褐入朝，领兵北上，及定，缮兵固圉，靖帝既推心置腹，哲亦忧国忘家，身系社稷，志存宗社，厥功伟矣。"
					]
				},
				{
					title: "《伪梁史-本纪第四》",
					content:[
						"梁哲明昭敬文宪武诚至德仁广孝靖皇帝，武帝七子，母贵妃林氏。幼端重沉静，言动有经，稍长习射，发无不中，弱冠，封靖王，次年赤焰林氏案发，以同林氏相交甚厚见罪与武帝，自请出镇东海。",
						"先是，誉王景桓以慧黠有宠于武帝，阴谋夺嫡，谮太子景宣，时靖帝从军有功，誉王惮，几劾之。值武帝春狩，誉王伙徐安谟为奸，叛于九安山，帝持兵符驰召纪城军勤王靖难，力战三日，平乱，因得武帝心，及返京，立为皇太子。",
						"次年，翻赤焰案。当北境烽火起，帝以太子据守金陵，全城济师，其时武帝病笃，东宫监国，朝无废事。武帝崩，靖帝践祚，以明年为万和元年，次年春，皇后诞皇长子，帝赐名杋，同年后薨，帝恸，立皇长子为皇太子，并旨诏正阳宫永不再立。",
						"帝性宽仁，行节俭，夙兴夜寐，宵衣旰食，任贤良，除宵小，兴水利，筑军屯，新历法，扫荡边尘，狡寇震慑，纲纪修明，仓庾充羡，闾阎乐业，岁不能灾，民气渐舒，四境通和，八方来朝，蒸然有治平之象。四十九年，以病卒，遗诏传位于皇太子。"
					]
				},
			],

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
			set_state(state) {
				this.state = state;
			},			
			submit_advice() {
				const h = this.$createElement;
				this.$notify({
					title: "提示",
					message: h("i", {style: "color:#000000"}, "您的意见已收到，感谢反馈！")
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
	var pattern = Trianglify(
		{
			height: window.innerHeight,
			width: window.innerWidth,
			x_colors: ["rgba(255, 255, 255, 0.1)", "rgba(255, 255, 255, 1)"],
			stroke_width: 0,
			cell_size: Math.ceil(window.innerWidth / 8)
		}
	);
	var svg = pattern.svg();
	svg.id = "trianglify-overlay";
	document.body.appendChild(svg);
	window.jQuery || document.write("<script src='js/jquery.min.js'><\/script>");
	(function(){
		$("dd").filter(":nth-child(n+4)").addClass("hide");
		$("dl").on("click", "dt", function() {
			$(this).next().slideToggle(200);
		});
	})();
	document.getElementById("home_page").style.display = "block";
}
