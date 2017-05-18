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
                
        },
        //调用location.search 获取传进来的参数的值
        getSearch:function  (searchKey) {
        
              var searchObj = {},  temp;
              //获取到'?aaa=123&bbb=456' slice从第一个开始切到最后，等于切掉?号。然后在用&分隔，得到一个数组
                //定义一个变量接收数组['aaa=123', 'bbb=456']这样的值、
              var searchArr = location.search.slice(1).split('&');
              for (var i = 0,len = searchArr.length; i< len; i++) {
                        //循环分隔，分隔第一项。['aaa','123']
                        temp = searchArr[i].split('=')
                        //动态添加属性数组第一项是key,第二项是value{aaa:123}
                        searchObj[temp[0]] = temp[1]
              }
              //如果传进来是空值，返回一个空对象，否则传进来aaa，返回123
              return searchKey = null? searchObj : searchObj[searchKey]
        }
    }
})