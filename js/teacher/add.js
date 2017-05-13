define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'jqueryForm' , 'nprogress'],
    function (ud, $, ud, ud, util, ud, nprogress) {
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
        $('#tc-form').ajaxForm({
            url: '/v6/teacher',
            type: 'post',

            success: function (data) {
                console.log(data)

                location.href = '/html/teacher/list.html'

            },
            error: function () {
                alert('登录失败！！')
            }
        })
    });