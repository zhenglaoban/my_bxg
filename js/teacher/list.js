define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'template', 'nprogress', ],
    function (ud, $, ud, ud, util, template, nprogress) {
        // 配置网站进度条
        nprogress.start();
        $(function () {
            nprogress.done();
        });
        // 主页面调用，是否登录方法。没有登录，进不来主页面
        util.checkCookie();

        //发送ajax请求
        $.ajax({
            url: '/v6/teacher',
            type: 'get',
            success: function (data) {
                console.log(data)
                //调用模板引擎方法，
                var dataResult = template('temp', data)

                $('#father').html(dataResult)
            },
            error: function () {
                alert('失败！！')
            }
        })

        //模板引擎复杂运算方法，age模板里面是自定义的一个ID，
        template.helper('age', function (tepValue) {
            //如果没有传参，返回空字符串
            if (!tepValue) {
                return '';
            }
            //获取传参的前四位'1994-4-4'='1994'
            var birth = tepValue.slice(0, 4)
            //获取当前日期年份
            var nowY = new Date().getFullYear();
            //返回年纪
            return nowY - birth;
        })

         //模板引擎动态添加的。点击事件需要用事件委托注册。查看按钮
         $(document).on('click', '[href="#teacherModal"]' ,function  () {
             //获取自定义属性
             var tcId = $(this).attr('data-tc-id')
               $.get('/v6/teacher/view', {tc_id:tcId}, function  (data) {
                    $('#teacherModal').html(template('tc-view', data.result))
               })
                 
         })

        //注销/启用按钮
        $('#father').on('click', '#write-off', function () {
            var $that = $(this) 
            $.ajax({
                url: '/v6/teacher/handle',
                type: 'get',
                data: {
                    tc_id: $(this).attr('data-Id'),
                    tc_status: $(this).attr('data-status')
                },
                success: function (data) {
                  $that.attr('data-status',data.result['tc_status'])  
                    .html(data.result['tc_status'] == 0?' 注 销 ' : ' 启 用 ')
                }
            })
        })
    });