define(['bootstrap', 'jquery', 'aside', 'header', 'util', 'nprogress', 'template', 'jqueryForm', 'jquery_region', 'bootstrap_datepicker', 'bootstrap_datepicker_CN', 'jquery_uploadify'],
    function (ud, $, ud, ud, util, nprogress, template, ud, ud, ud,ud) {
        // 配置网站进度条
        nprogress.start();
        $(function () {
            nprogress.done();
        });
        // 主页面调用，是否登录方法。没有登录，进不来主页面
        util.checkCookie();

        // loading动画
        util.loading();

        //回显渲染页面
        $.get('/v6/teacher/profile', function (data) {
            $('.settings').html(template('tc-setting', data.result));
            //回显完成后调用 表单提交请求ajax。因为讲师列表里面要写查看详细信息，需要额外添加一个data属性，
            getModify();
            //调用三级连动
            getRegion();
            //调用时间日期选择插件
            getDate();
            //调用上传文件插件
            getUpfile();
        })

        function getModify() {
            $('.form-horizontal').on('submit', function (e) {
                //阻止submit默认跳转
                e.preventDefault();
                //当前的表单提交
                $(this).ajaxSubmit({
                    url: '/v6/teacher/modify',
                    type: 'post',
                    //额外添加的一个属性。湖北|武汉|武昌   拼接字符串，列表查看功能使用
                    data: {
                        tc_hometown: $("#p").find(':selected').html() + '|' + $("#c").find(':selected').html() + '|' + $("#d").find(':selected').html()
                    },
                    success: function (data) {
                        console.log(data)
                        //请求成功刷新本页面。
                        location.reload();
                    }
                })
            })
        }
        //省，市，区，三级连动  地区插件   
        function getRegion() {
            $('#tc-region').region({
                //地址必须指向一个内带的JSON文件
                url: '/lib/jquery-region/region.json'
            })
        }

        //日期时间选择插件
        function getDate() {
            $('input[name="tc_birthday"]').datepicker({
                //设置语言，必须引入语言包
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                startDate: '1950-01-01',
                endDate: new Date()
            })
            $('input[name="tc_join_date"]').datepicker({
                language: 'zh-CN',
                format: 'yyyy-mm-dd',
                startDate: '2000-01-01',
                endDate: new Date()
            })
        }
        //初始化上传头像插件。
        function  getUpfile() {
              $('#upfile').uploadify({
                  swf: '/lib/uploadify/uploadify.swf',  //flash 选取文件脚本。必须
                  uploader: '/v6/uploader/avatar',      //指向服务器接口 必须
                  fileObjName: 'tc_avatar',              //相当于表单name属性，提交  必须
                  buttonText:'',                  //设置按钮文本，可选
                  height:$('.preview').height(),
                  //成功回调函数，第一个参数是文件对象，第二个是请求回来的数据
                  onUploadSuccess:function  (file,data) {
                      //这里接收到的是一个json字符串。，需要先把接收到的data改为对象，才能赋值
                    //   console.log(JSON.parse(data).result.path)
                       $('#avatar').attr('src',JSON.parse(data).result.path)
                  }
              })
                
        }
    });