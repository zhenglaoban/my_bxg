define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'jqueryForm'],
	function (ud, $, ud, ud, util, nprogress, ud) {
		// 配置网站进度条
		nprogress.start();
		$(function () {
			nprogress.done();
		});
		// 主页面调用，是否登录方法。没有登录，进不来主页面
		util.checkCookie();

		// loading
		util.loading();

		//
		$('form').on('submit', function (e) {
			e.preventDefault();
			if ($('#password').val() === $('#okpassword').val()) {
				$(this).ajaxSubmit(function () {
					$('#logout').trigger('click')
				})
			}else {
				alert('两次密码不一致')
			}

		})
	});