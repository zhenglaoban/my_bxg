define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'template', 'jquery_uploadify', 'jquery_Jcrop'],
	function (ud, $, ud, ud, util, nprogress, template, ud, ud) {
		// 配置网站进度条
		nprogress.start();
		$(function () {
			nprogress.done();
		});
		// 主页面调用，是否登录方法。没有登录，进不来主页面
		util.checkCookie();
		// 发送ajax加载齿轮
		util.loading();
		//获取到课程ID
		var csId = util.getSearch('cs_id')
		//第二页面回显
		$.get('/v6/course/picture', {
			cs_id: csId
		}, function (data) {
			$('.steps').html(template('step2-temp', data.result))
			//上传头像
			getUploadify();
		})
		//初始化图片插件 
		function getUploadify() {
			$('#btn-cs-img').uploadify({
				swf: '/lib/uploadify/uploadify.swf', //flash 选取文件脚本。必须
				uploader: '/v6/uploader/cover', //指向服务器接口 必须
				fileObjName: 'cs_cover_original', //相当于表单name属性，提交  必须
				formData: {
					cs_id: csId //配置除fileObjName，需要额外提交的数据
				},
				itemTemplate: '<i></i>', //消除上传百分比显示
				buttonClass: 'btn btn-success btn-sm btn-cs-img', //按钮设置类名，可以添加样式
				width: 80,
				buttonText: '上传图片', //设置按钮文本，可选
				//成功回调函数，第一个参数是文件对象，第二个是请求回来的数据
				onUploadSuccess: function (file, data) {
					//上传后图片动态回显。 这里接收到的是一个json字符串。，需要先把接收到的data改为对象，才能赋值
					$('.preview img').attr('src', JSON.parse(data).result.path)
					$('.thumb img').attr('src', JSON.parse(data).result.path)
				
				}
			})
		}

		//剪切图片插件	
		var J = null;

		$(document).on('click', '#cut', function () {
			$(this).parent().next().show()
			$('#jianqie').Jcrop({
				setSelect: [0, 0, 300, 150],
				minSize: [300, 150],
				boxWidth:$('.preview img').width(),
			}, function () {
				J = this;
				J.initComponent('Thumbnailer', {width: 300, height: 150 })
				// $('.jcrop-thumb').appendTo($('.thumb'))
			})

		})
		$(document).on('click', '#baocun', function () {
			var result = J.getSelection();
			console.log(result)
			$.post('/v6/course/update/picture', {
				cs_id: csId,	
				x: result.x,
				y: result.y,
				w: result.w,
				h: result.h,
			}, function () {
				location.href = '/html/course/course_add_step3.html?cs_id=' + csId
			})

		})

	});