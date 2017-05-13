define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'template', 'nprogress'],
    function (ud, $, ud, ud, util, template, nprogress) {
        // 配置网站进度条
        nprogress.start();
        $(function () {
            nprogress.done();
        });
      	// 主页面调用，是否登录方法。没有登录，进不来主页面
	util.checkCookie();

        // loading
        util.loading();

        $.ajax({
            url: '/v6/teacher',
            type: 'get',
            success: function (data) {
                console.log(data)
                var dataResult = template('temp', data)
                $('#father').html(dataResult)
            },
            error: function () {
                alert('失败！！')
            }
        })
    });