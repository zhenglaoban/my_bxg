define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'template', 'jqueryForm', 'bootstrap_datepicker', 'bootstrap_datepicker_CN'],
	function (ud, $, ud, ud, util, nprogress, template, ud) {
		// 配置网站进度条
		nprogress.start();
		$(function () {
			nprogress.done();
		});
		// 主页面调用，是否登录方法。没有登录，进不来主页面
		util.checkCookie();

		// 等待加载此轮图片
		util.loading();

		//调用工具包里面的方法，BOM中的location.search，获取到id值
		var tcId = util.getSearch('tc_id');

		//发送ajax请求。传入获取到的ID值， 回显当前点击的信息
		$.get('/v6/teacher/edit', {
			tc_id: tcId
		}, function (data) {
			//调用模板引擎渲染页面
			var tc_edit = template('tc_edit_temp', data.result);
			$('.teacher-add').html(tc_edit)
			//调用表单提交插件
			getForm();
			//调用时间日期插件
			getDate();

		})
		//修改当前显示的信息。提交form表达，请求ajax。调用表单提交插件,
		//注意！！！渲染的表单是动态生成的。使用这个ajax请求必须写在生成完成后
		function  getForm() {
			$('#tc-edit-form').ajaxForm({
				url: '/v6/teacher/update',
				type: 'post',
				data: {
					tc_id: tcId
				},
				success: function () {
					//成功跳转到列表页面
					location.href = '/html/teacher/list.html';
				}
			})
		}
		//日期时间选择插件
		function getDate() {
			$('#join_date').datepicker({
				//设置语言，必须引入语言包
				language: 'zh-CN',
				format: 'yyyy-mm-dd',
				startDate: '1950-01-01',
				endDate: new Date()
			})
		}

	});