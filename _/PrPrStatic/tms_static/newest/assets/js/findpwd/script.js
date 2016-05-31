$(function(){

    var $form = $('.login-list');
    $form.find('input[type=text], input[type=password]').on('focus', function(e) {
        $(this).addClass('b-line');
    }).on('blur',function() {
        $('.b-line').removeClass('b-line');
    });

     //验证emai
    function checkEmail(str) {
        var reg = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
        return reg.test(str);
    }

    function loginTest() {
        var resetEail = $('.reset-email ').val();
        
        
        if(resetEail == '') {
            $('.resete-error').html('邮箱为空').show();
            return false;
        }
        if(!checkEmail(resetEail)) {
             $('.resete-error').html("输入合法的邮箱").show();
             return false;
        }
        
        //ajax 验证邮箱是否存在

       
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