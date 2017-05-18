define(['jquery', 'jquery_cookie'], function ($, ud) {
    //侧边栏 定义一个空对象
    var userInfo = {};
    //如果客户清除了cookie。抓取错误不报错。如果没有JSON.parse里面没有值，正常情况会报错
    try {
        //传过来的cookie值是json字符串。这里要转化成对象。
        userInfo = JSON.parse($.cookie('userInfo'))
    } catch (e) { //抓取错误
        console.log(11)
    }
    //如果这个属性存在。那么就执行后面的代码，把img的SRC属性赋值为cookie里面的值。
    //如果不存在。就不改变默认值。使用默认图片
    userInfo.tc_avatar && $('.avatar img').attr('src', userInfo.tc_avatar);
    //获取对象。改变文字。
    //如果传过来没有值。不设置默认值。
    userInfo.tc_name && $('.profile h4').text(userInfo.tc_name)
    //点击事件
    $('.slide-down').on('click', function () {
        //此元素的下个元素，下拉，收回
        $(this).next().slideToggle();
    })

    var pathname = location.pathname;


    var pathnameObj = {
        '/html/teacher/add.html': '/html/teacher/list.html',
        '/html/teacher/edit.html': '/html/teacher/list.html',
        '/html/user/profile.html': '/html/user/list.html'
    }

    var href = pathnameObj[pathname] ? pathnameObj[pathname] : pathname;
    
    /**
     * 左侧导航焦点定位：
     * 1、先获取页面的pathname
     * 2、定义一个对象，这个对象存储pathname与左侧导航对应的href属性值
     * 3、然后我们使用页面的pathname去对象中匹配，
     * 匹配到了就使用这个匹配到的值获取对应的a添加active_Class设置焦点，
     * 如果没有匹配到，就直接使用该pathname获取对应a添加active_Class设置焦点。
     * */
    $('.navs a').removeClass('active').filter('[href="' + href + '"]').addClass('active')

});