$(function() {
    function hoverTab() {
        var $login = $('.top-login p');
        $login.mouseenter(function(e) {
            var attr = $(this).attr('data-attr');
            $(this).addClass('on').siblings().removeClass('on');
            $('.switch-l').find(' div[data-attr=' + attr + ']').show().siblings().hide();
        }).mouseleave(function() {
            //leave
        });

    }
    hoverTab();

    //body的高度计算
    var winW = $(window).width();
    var currentW = '';
    function winHeigth() {
        currentW = $(window).width();
        var winH = $(window).height();
        var bodyH = winH-parseInt($('.header ').height())-121;
        console.log('111',winH);
        $('.login-bd').css('height',bodyH);
    }
    winHeigth();
    winW.Timeout = null;
    $(window).on('resize', function() {
        var winWTimeout = winW.Timeout;
        if(winWTimeout) clearTimeout(winWTimeout);
        winWTimeout = setTimeout(function(){
            winHeigth();

        },800);

    });


    //验证email
    function checkEmail(str) {
        var reg = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
        return reg.test(str);
    }
    //焦点样式
    var $form = $('.login-cont form');
    $form.find('input[type=text], input[type=password]').on('focus', function(e) {
        $(this).parent('div').addClass('b-line');
    }).on('blur',function() {
        $('.b-line').removeClass('b-line');
    });
    $('.input-num').on('focus', function(e) {
        $(this).addClass('b-line');
    }).on('blur',function() {
        $('.b-line').removeClass('b-line');
    });

    //登陆验证input
    var check = true;
    function loginTest() {
        var emailVal = $('.form-login .email-ipt').val();
        var curPwd = $('.form-login .pwd-ipt').val();

        if(emailVal == '') {
           $('.form-login .error-email').html('请输入邮箱').show();
           return false;
        }
        if( !checkEmail(emailVal) ) {
            $('.form-login .error-email').html('请输入合法的邮箱名').show();
            return false;
        }

        //ajax 验证邮箱是否是占用
        //
        if(curPwd == "") {
            $('.form-login .error-pwd').html('密码不能为空').show();
            return false;
        }

        if(!(curPwd.length >= 6 && curPwd.length < 18)) {
            $('.form-login .error-pwd').html('长度6-18位').show();
            return false;
        }
        return true;
        //密码是否正确ajax验证
        //

    }
    //注册验证

    $('.form-login input[type!="submit"]').focus(function() {
        $(this).next('.error').hide();
    }).blur(function() {
        var flag = loginTest();
        if(flag) {
            $(this).next('.error').show();
        }
    });

    $('.form-login .submit').on('click', function() {
        var flag = loginTest();

        if(flag) {
            console.log(1);
            //sendAjax();
        } else {
            return false;
        }
    });


    //注册事件验证
    var registerCheck = true;
    function registerTest() {
        var emailVal = $('.form-register .email-ipt').val();
        var curPwd = $('.form-register .pwd-ipt').val();
        var aginPwd = $('.form-register .pwd-aginpwd').val();

        if(emailVal == '') {
            $('.form-register .error-email').html('请输入邮箱').show();
            return false;
        }
        if( !checkEmail(emailVal) ) {
            $('.form-register .error-email').html('请输入合法的邮箱名').show();
            return false;

        }

        //ajax 验证邮箱是否是占用
        //
        if(curPwd == "") {
            $('.form-register .error-pwd').html('密码不能为空').show();
            return false;
        }

        /*if(!(curPwd.length >= 6 && curPwd.length < 18)) {
            $('.form-register .error-pwd').html('长度6-18位').show();
            registerCheck = false;
        }else {
            $('.form-register .error-pwd').hide();
            registerCheck = true;
        }*/

        if(!(curPwd.length>=6 && curPwd.length < 18 || aginPwd.length>=6 && aginPwd.length < 18)) {
            console.log(1)
            $('.form-register .error-pwd').html('长度6-18位').show();
            return false;
        }
        if(curPwd != aginPwd || curPwd.length < 6 ) {
            console.log(3)
            $('.form-register .error-aginpwd').html("密码不一致").show();
            return false;
        }
        //密码是否正确ajax验证
        //

    }

    $('.form-register input[type!="submit"]').focus(function() {
        $(this).next('.error').hide();
    }).blur(function() {
        var flag=registerTest();
        if(flag) {
            $(this).next('.error').show();
        }
    });
    //点击注册事件
    $('.form-register .submit').on('click', function() {
       var flag=registerTest();
        if(flag) {
            //registerAjax();
        } else {
            return false;
        }
    });
    //选中下次自动登陆

    function isChoose($choose) {
        var  $this=  $choose;
        var  $parent = $this.parent();
        if($parent.hasClass('login-forget')) {
            $parent.removeClass('login-forget');

        } else {
            $parent.addClass('login-forget');

        }

    }

    $('.icon-l').on('click', function() {

        var $this = $(this);
        isChoose($this);

    });
    $('.icon-r').on('click', function() {

        var $this = $(this);
        isChoose($this);
    });

    // 注册发送ajax验证
    function registerAjax() {
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
    };
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
    };

    //下次自动登陆是否选中
    function isAutoLogin() {
        try {
            if(isForget) {
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
    isAutoLogin();
    function SetCookie(email, pwd) {
        var date = new Date();
        date.setTime(date.getTime() + 1866240000000);
        document.cookie = "email="
        +email
        + ";emailval="+pwd
        + "expires=" + date.toGMTString();
    }

    //获取cookie
    function GetCookie() {


    }


    // 新浪微博
    $('body').delegate('.weibo', 'click', function() {
        window.open();
        return false;
    });




});