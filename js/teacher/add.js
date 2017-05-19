define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'jqueryForm' , 'nprogress','bootstrap_datepicker_CN'],
    function (ud, $, ud, ud, util, ud, nprogress,ud) {
        // 配置网站进度条
        nprogress.start();
        $(function () {
            nprogress.done();
        });
	// 主页面调用，是否登录方法。没有登录，进不来主页面
	util.checkCookie();

        // loading
        util.loading();
        //根据表单的submit提交ajax请求。
        $('#tc-form').ajaxForm({
            url: '/v6/teacher/add',
            type: 'post',

            success: function (data) {
                console.log(data)
              //数据提交跳到列表页面  
                location.href = '/html/teacher/list.html'
            },
            error: function () {
                alert('登录失败！！')
            }
        })
        //时间插件
        $('[name="tc_join_date"]').datepicker({
            	language: 'zh-CN',
				format: 'yyyy-mm-dd',
				startDate: '1950-01-01',
				endDate: new Date()
        })
    });