define(['jquery', 'bootstrap', 'jqueryForm','jquery_cookie','nprogress','util'], function ($, ud, ud,ud,nprogress,util) {

    //加载进度条开始
    nprogress.start();
    //加载进度条结束，在所有加载完成后调用
    $(function  () {
          nprogress.done();
    })
    //调用工具里面的加载方法。
    util.loading();
    
    //监听表单提交submit事件，阻止默认的提交
    $('#login-form').ajaxForm({
        url: '/v6/login',
        type: 'post',
        success: function (data) {
            //使用cookie插件，添加一个cookie，key是userInfo, value是返回登录成功返回的对象。
            //因为value必须是字符串，如果是其它类型。会调用tostring方法。对象会变成'[object object]'
             $.cookie('userInfo',JSON.stringify(data.result),{
                 //所有子页面共享这个cookie
                 path:'/',
                 //cookie保存至这个时间为止
                 expires: new Date("2017-6-14")
                })
             //页面跳转到主页面
            location.href = '/'

        },
        error: function () {
            alert('登录失败！！')
        }
    }); 
    //如果有这个cookie，说明已经登录。不需要再进入登录界面。直接跳到主界面
    if ($.cookie('PHPSESSID')) {
        location.href='/';
    }
})