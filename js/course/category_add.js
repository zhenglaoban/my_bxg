define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'template', 'jqueryForm'],
	function (ud, $, ud, ud, util, nprogress, template, ud) {
		// 配置网站进度条
		nprogress.start();
		$(function () {
			nprogress.done();
		});
		// 主页面调用，是否登录方法。没有登录，进不来主页面
		util.checkCookie();
		// loading
		util.loading();
		//获取ID
		var cgId = util.getSearch('cg_id');
		var cgPid = null;
		//如果有获取到ID是编辑页面，先回显该ID的数据。
		if (cgId) {
			$.get('/v6/category/edit', {
				cg_id: cgId
			}, function (data) {
				console.log(data)
				//给返回的数据动态添加一个属性。修改分类用到的请求地址。
				data.result.action = '/v6/category/modify';
				//添加模板渲染页面
				$('.category-add').html(template('edit-add-temp', data.result));
				//修改表单，提交表单发送ajax。
				$('#edit-form').ajaxForm({
					data: {
						cg_id: data.result.cg_id,
					},
					success: function () {
						location.href = "/html/course/category_list.html"
					}
				})

			})
		} else {  //如果没有获取到ID，说明是添加页面。添加页面没有给跳转添加Search值
			//添加页面也要渲染分类option列表
			$.get('/v6/category/top', function (data) {
				//请求顶级分类，给返回数据添加一个属性action。添加分类用到的请求地址
				data.action = '/v6/category/add';
				//因为模板引擎用的TOP数组遍历，动态添加一个TOP数组=返回的result数组
				data.top = data.result;
				$('.category-add').html(template('edit-add-temp', data));
				console.log(data)
				$('#edit-form').ajaxForm({
					success: function () {
						location.href = "/html/course/category_list.html"
					}
				})
			});


		}


	});