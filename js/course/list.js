define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'template'],
	function (ud, $, ud, ud, util, nprogress,template) {
		// 配置网站进度条
		nprogress.start();
		$(function () {
			nprogress.done();
		});
		// 主页面调用，是否登录方法。没有登录，进不来主页面
		util.checkCookie();
		// loading
		util.loading();

		

		$.get('/v6/course',function  (data) {
			  $('.courses').html(template('cs-temp',data))
				
		})
	});