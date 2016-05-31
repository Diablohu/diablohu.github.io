$(function(){


    //验证email 
   
    var $form = $('.login-list');
    $form.find('input[type=text], input[type=password]').on('focus', function(e) {
        $(this).addClass('b-line');
    }).on('blur',function() {
        $('.b-line').removeClass('b-line'); 
    });

    function loginTest() {
        var curPwd = $('.log-pwd').val();
        var aginPwd = $('.log-aginpwd').val();
        
        if(curPwd == '') {
            $('.pwd-tip').html('密码为空').show();
        }
        if(curPwd.length != aginPwd.length) {
             $('.aginpwd-tip').html("密码长度不一致").show();
             return false;
        }
        if(!(curPwd.length>=6 && curPwd.length < 18 || aginPwd.length>=6 && aginPwd.length < 18)) {
            $('.aginpwd-tip').html('长度6-18位').show();
            return false;
        }
        if(curPwd != aginPwd) { 
            $('.aginpwd-tip').html("密码不一致").show();
            return false;
        }

       
        return true;
    }


    //点击验证
    $('.login-btn').on('click', function() {
        var flag = loginTest();
        console.log(flag);
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
 
    



});