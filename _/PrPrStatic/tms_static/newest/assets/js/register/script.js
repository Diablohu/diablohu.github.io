$(function() {

    var isSubmit = true;
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


    function check() {
        var emailVal = $('.log-emial').val();
        var nickNameVal = $('.log-nickname').val();
        var curPwd = $('.log-pwd');
        var aginPwd = $('.log-aginpwd');
        var argeement = $('.argeement');


        if (!checkEmail(emailVal)) {

            $('.email-error').html('请输入正确的邮箱名').show();
            isSubmit = false
        } else {
            $('.email-error').hide();
        }

        if (!(nickNameVal != '')) {
            $('.nick-error').html('用户名不能为空').show();
            isSubmit = false
        }
        if (nickNameVal.length < 3 || nickNameVal.length > 15) {

            $('.nick-error').html('用户名长度须在3-15之间!').show();
            isSubmit = false
        }else {
            $('.nick-error').hide();
        }

        //验证用户名是否存在 ajax验证



        if (curPwd.val() != aginPwd.val()) {
            $('.aginpwd').html("输入密码不一致").show();
            isSubmit = false

        }
        if (curPwd.val().length != aginPwd.val().length) {
            $('.aginpwd').html("两次长度不一致").show();
            isSubmit = false;

        }
        if (!(curPwd.val().length >= 6 && curPwd.val().length < 18)) {

            $('.pwd-cur-t').html("密码长度6-18位.").show();
            isSubmit = false;

        }
        if (!(argeement.checked)) {
                isSubmit = false;
        }

    }

    var $submit = $('.login-btn');
    $('.login-form input[type!="submit"]').blur(function() {
        check();
    });
    $submit.on('click', function(e) {
        check();

        if (isSubmit) {
            sendAjax();
        } else {
            return false;
        }
    });

/*
Global.pop.countDown();
$('body').append(Global.pop.popHtml({title:'密码重置成功',iscorrect: false,hintinfo:'密码重置成功请牢记密码'}));
*/

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