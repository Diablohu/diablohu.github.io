$(function() {


    //验证email
    function checkEmail(str) {
        var reg = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
        return reg.test(str);
    }

    var $form = $('.login-list');
    $form.find('input[type=text], input[type=password]').on('focus', function(e) {
        $(this).addClass('b-line');
    }).on('blur',function() {
        $('.b-line').removeClass('b-line');
    });

    function loginTest() {
        var emailVal = $('.login-email').val();
        var curPwd = $('.login-pwd').val();

        if(emailVal == '') {
           $('.email-tip').html('请输入邮箱').show();
            return false; 
        }
        if( !checkEmail(emailVal) ) {
            $('.email-tip').html('请输入合法的邮箱名').show();
            return false;
        } else {
            $('.email-tip').hide();
        }

        //ajax 验证邮箱是否是占用
        //
        if(curPwd == "") {
          $('.pwd-tip').html('密码不能为空').show();
          return false;  
        }

        if(!(curPwd.length >= 6 && curPwd.length < 18)) {
            $('.pwd-tip').html('长度6-18位').show();
            return false;
        }

        //密码是否正确ajax验证
        //
        return true;
    }


    //点击验证
    $('.login-btn').on('click', function() {
        var flag = loginTest();
        if(flag) {
            sendAjax();
        } else {
            return false;
        }
    });

    // 发送ajax验证
     function sendAjax() {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '',
            data: {

            },
            success: function(data) {
                //
            },
            error: function(data) {

            }

        });
    }
 
    //下次自动登陆是否选中
    function isAutoLogin() {
        try {
            var isSave = $('.login-auto').checked; 
            if(isSave) {
                var autoEmail =  $('.login-email').val();
                var autoPwd = $('.login-pwd').val();

                if(autoEmail !='' && autoPwd!='') {
                    SetCookie(autoEmail,autoPwd);
                } else {
                    SetCookie('','');
                }
            }
        }catch(e) {

        }

    }

    function SetCookie(email, pwd) {
        var date = new Date();
        date.setTime(date.getTime() + 1866240000000);
        document.cookie = "emailval="+email+ "%%" +pwd+"; expires=" + date.toGMTString();
    }

    //获取cookie
    function GetCookie() {


    }



    /*var winWidth=$("body").height();
    if(winWidth<800){
        $('.bd').removeClass("judge");
    }else{
        $('.bd').addClass("judge");
    }
    $(window).resize(function(){
        var winWidth=$("body").height();
        if(winWidth<800){
            $('.bd').removeClass("judge");
        }else{
            $('.bd').addClass("judge");
        }
    });*/



});