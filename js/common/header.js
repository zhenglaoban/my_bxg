define(['jquery'], function($) {
	//点击退出按钮，退回到登录界面。后台要操作清除cookie。清除登录记录。
    $('#logout').on('click',function  () {
          $.ajax({
              type:'post',
              url:'/v6/logout',
              success:function  () {
                location.href= '/html/home/login.html';
              },
              error:function  () {
                    alert('超时')  
              }
          })
    })

});
