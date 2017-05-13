define(['jquery', 'jquery_cookie'], function () {
    //公共模块代码。返回一个对象。谁要用。谁依赖这个模块，然后调用他的方法
    return {
        //检查是否登录成功方法。
        checkCookie: function () {
            //如果存在这个cookie。说明登录了。取反，不执行下面代码！如果不存在，那就跳到登录界面
            if (!$.cookie('PHPSESSID')) {
                location.href = '/html/home/login.html';
            }
        },
        //加载方法
        loading:function  () {
            //如果页面有多个ajax请求。在第一个ajax请求的时候触发事件。遮罩层显示。
             $(document).on('ajaxStart',function  () {
                   $('.overlay').show()
            //如果页面有多个ajax请求。在最后一个ajax请求完毕的时候触发事件。遮罩层隐藏。            
             }).on('ajaxStop',function  () {
                    $('.overlay').hide()
             })
                
        }
    }
})