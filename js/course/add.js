define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'jqueryForm'], 
function(ud, $, ud, ud, util, nprogress) {
	// 配置网站进度条
	nprogress.start();
	$(function() {
		nprogress.done();
	});
		// 主页面调用，是否登录方法。没有登录，进不来主页面
	util.checkCookie();
	// loading
	util.loading();

	  


	$('form').ajaxForm(function (data) {
		location.href='/html/course/course_add_step1.html?cs_id='+ data.result.cs_id;		  
	})


});
