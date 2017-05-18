define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'template', 'jqueryForm'],
	function (ud, $, ud, ud, util, nprogress, template) {
		// 配置网站进度条
		nprogress.start();
		$(function () {
			nprogress.done();
		});
		// 主页面调用，是否登录方法。没有登录，进不来主页面
		util.checkCookie();
		// loading
		util.loading();
		//调用工具里面Search方法获取到ID值。
		var csId = util.getSearch('cs_id')
		//基本信息的回显数据
		$.get('/v6/course/basic', {cs_id: csId}, function (data) {
			$('.steps').append(template('step1-temp', data.result))
			//基本信息的修改方法
			getUpdate();
		})
		//修改方法。动态模板生成调用
		function getUpdate() {
			$('.content form').ajaxForm({
				//id属性必须传。
				data:{
					cs_id:csId
				},
				success:function  (data) {
					 location.href='/html/course/course_add_step2.html?cs_id=' + csId
				}
			})
		}
		//事件委托，二级联动，根据父类的ID。查找到子类对应option。
		$(document).on('change', '#father-cg', function  () {
			  $.get('/v6/category/child', {cg_id:$(this).val()},function  (data) {
					var options= '';
					//遍历查找到的option。然后拼接字符串
					for (var i = 0, len = data.result.length ; i < len; i++) {
							options += '<option value="' + data.result[i].cg_id + '">' + data.result[i].cg_name + '</option>'	
					}
					//添加到子类select列表。
					$('#child-cg').html(options);
			  })
		})

	});