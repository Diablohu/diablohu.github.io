$(function() {
    var $form = $('.reglist'); 
    $form.find('input[type=text], input[type=password]').on('focus', function(e) {
        $(this).addClass('b-line');
    }).on('blur',function() { 
        $('.b-line').removeClass('b-line');
    });

    function checkEmail(str) {
        var reg = /[a-z0-9-]{1,30}@[a-z0-9-]{1,65}.[a-z]{3}/;
        return reg.test(str);
    }


    function checkClick() {
        var emailVal = $('.log-emial').val();
        var nickNameVal = $('.log-nickname').val();
        var curPwd = $('.log-pwd');
        var aginPwd = $('.log-aginpwd');
        var argeement = $('.argeement');

        if (!checkEmail(emailVal)) {
            $('.email-error').html('请输入正确的邮箱名').show();
            return false;
        } else {
            $('.email-error').html('');
        }
        
        if (!(nickNameVal != '')) {
            $('.nick-error').html('用户名不能为空').show();
            return false;
        } else {
            $('.nick-error').html('');
        }

        if (nickNameVal.length < 4 || nickNameVal.length > 15) {
            $('.nick-error').html('用户名长度须在4-15之间!').show();
            return false;
        } else {
            $('.nick-error').html('');
        }

        //验证用户名是否存在 ajax验证
        
        
        
        if (curPwd.val() != aginPwd.val()) {
            $('.aginpwd').html("输入密码不一致").show();
            return false;
        } else {
            $('.aginpwd').html("")
        }

      
        if (!(argeement.checked)) {
                return false;
        }
        return true;

    }

    var $submit = $('.login-btn');

    /*$submit.on('click', function(e) {
        var flag = checkClick();
        //console.log(flag);
        if (flag) {
            //sendAjax();
alert(11);
        } else {
            return false;
        }
    });*/

  

    function sendAjax() {
        $.ajax({
            type: 'post',
            dataType: 'json',
            url: '',
            data: {

            },
            success: function(data) {
                //出现弹框
                $('body').append(Global.pop.popHtml('密码重置成功', false, '密码重置成功请牢记密码'));
                Global.pop.countDown();
            },
            error: function(data) {

            }

        });
    }

});