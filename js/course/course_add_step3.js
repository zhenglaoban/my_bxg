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
		//获取课程ID
		var csId = util.getSearch('cs_id')
		//第三页面回显，调用方法，下面还要用到
		getLessons();
		//第三页面回显方法
		function getLessons() {
			$.get('/v6/course/lesson', {
				cs_id: csId
			}, function (data) {
				$('.steps').html(template('step3-temp', data.result))
			})

		}
		//动态生成的模板，用事件委托，因为添加和编辑是共用同一个模板。所以2个按钮绑定一个事件。
		$(document).on('click', '.btn-add, .btn-edit', function () {
			//获取自定义属性值，课时的ID
			var ctId = $(this).attr('data-ct-id')
			//如果有这个属性的就是编辑按钮，因为只给编辑按钮添加了自定义属性
			if (ctId) {
				//发送ajax回显数据。
				$.get('/v6/course/chapter/edit', {
					ct_id: ctId
				}, function (data) {
					//因为是同一个模板，需要请求不同的地址，这里在回显数据中给编辑按钮动态添加一个。
					data.result.action = '/v6/course/chapter/modify';
					//渲染模板
					$('#chapterModal').html(template('modal-temp', data.result))
					console.log(data)
				})
			} else {
				//添加按钮。不需要回显数据。动态生成一个请求地址，渲染到模板中
				$('#chapterModal').html(template('modal-temp', {
					action: '/v6/course/chapter/add'
				}))
			}
		})
		
		//同样事件委托，提交表单请求。有几个特殊数据，需要用到灵活性更强的ajaxSubmit
		$(document).on('click', '.btn-add-edit', function () {
			$('#step3-form').ajaxSubmit({
				data: {
					ct_id: $(this).attr('data-ct-id'), //课时id，添加给编辑按钮的自定义属性了。编辑课时需要的值
					ct_cs_id: csId,						//给哪门课程添加课时，添加课时需要的值	
					//特殊值，做特殊处理。需要传递的是数字。用prop方法判断是否选中，
					ct_is_free: $('#checkbox-ok').prop('checked') ? '1' : '0'  
				},
				success: function (data) {
					//提交完成，隐藏模态框，重新调用第三页面回显方法
					getLessons();
					$('#chapterModal').modal('hide');
				}
			})
		})
	});