$(function() { 
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

    // 选中自动登录checkbox
//选中下次自动登陆
     isChoose($(".icon-l"));
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

	$("#login-form").validate({
		rules : {
			email : {
				required : true,
				email : true
			},
			password : {
				required : true,
				rangelength : [ 8, 18 ]
			}
		},
		messages : {
			email : "请输入合法的邮箱名",
			password : {
				required : "密码不能为空",
				minlength : "密码长度8-18位"
			},
		}
	});
	$("#register-form").validate(
			{
				rules : {
					username : {
						required : true,
						rangelength : [ 4, 16 ],
						remote : '/register/checkNickname' + "?rand="
								+ Math.random() * 1000,
					},
					email : {
						required : true,
						email : true,
						remote : '/register/checkEmail' + "?rand="
								+ Math.random() * 1000,
					},
					password : {
						required : true,
						rangelength : [ 8, 18 ]
					},
					password_confirm : {
						required : true,
						equalTo : "#password"
					},
					code : {
						required : true
					},
					agreement : {
						required : true
					}
				},
				messages : {
					username : {
						required : "请输入用户名",
						rangelength : "用户名长度4-16位",
						remote : '用户名已存在，请更换'
					},
					email : {
						required : "请输入邮箱",
						email : "请输入合法的邮箱名",
						remote : '邮箱已存在，请更换'
					},
					password : {
						required : "请输入密码",
						rangelength : "密码长度8-18位"
					},
					password_confirm : {
						required : "请输入确认密码",
						equalTo : "密码不一致"
					},
					code : {
						required : '请输入验证码'
					},
					agreement : {
						required : '请仔细阅读用户协议，并确认'
					}
				},
				errorPlacement : function(error, element) {
					error.addClass("help-block");

					if (element.prop("type") === "checkbox") {
						error.insertAfter(element.parent().parent().find("p"));
					} else if (element.prop("name") === "code") {
						error.insertAfter(element.parent().find("p"));
					} else {
						error.insertAfter(element);
					}
				},
				submitHandler : function(form) {
					ajaxSubmitForm();
					return false;
				}
			});
})
// 提交表单
function ajaxSubmitForm() {
	var param = $("#register-form").serialize();
	var url = "/register/index";
	$.ajax({
		type : "post",
		cache : false,
		dataType : "json",
		url : url,
		data : param,
		beforeSend : function(XMLHttpRequest) {
			// do something before submit...
		},
		success : function(data, textStatus) {
                         //alert(data.errorMsg);return false;
			 $('.form-register .error-checked').html(data.errorMsg);
                       if(data.errorNo == 0){
                         window.location.href="http://login.prpracg.com/member/broadcast/list?r="+Math.random();
}
		},
		complete : function(XMLHttpRequest, textStatus) {
			// do something in the end...
		}
	});
}
function refreshCaptcha() {
	var img = document.images['captchaimg'];
	img.src = img.src.substring(0, img.src.lastIndexOf("?")) + "?rand="
			+ Math.random() * 1000;
}
// 点击登录和注册，切换页面url
var $login = $('.top-login p');
$login.click(function(e) {
	var attr = $(this).attr('data-attr');
	var ison = $(this).attr('class');
	if (ison != 'on') {
		if (attr == 't-login') {
			window.location.href = "/login";
			return false;
		} else if (attr == 't-register') {
			window.location.href = "/register";
			return false;
		}
	}
});