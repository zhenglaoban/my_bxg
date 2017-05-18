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

	    //点击事件 下面兄弟显示
    $('.slide-down').next().show();

	$('form').ajaxForm(function (data) {
		location.href='/html/course/course_add_step1.html?cs_id='+ data.result.cs_id;		  
	})


});
