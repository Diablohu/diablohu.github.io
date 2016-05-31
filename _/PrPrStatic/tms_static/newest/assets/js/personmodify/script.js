/**
 * Created by i on 2016/1/21.
 */
/*个人修改密码*/
$(function() {
        $("#currentPwd").blur(function() {
            var param = $("#currentPwd").val();
            $.ajax({
                url:"",
                data: {
                    oldPwd: param
                },
                success: function(e) {
                    if(e.code !== 1) {
                        $(".pwd-tip").html("旧密码不对")
                    }
                }
            })
        });

        $("#firstPwd").blur(function() {
            var num1 = $("#firstPwd").val().length;
            if(!(num1>6 && num1<18)) {
                $(".aginpwd-tip").html('密码8至16位');
            }
        });
        $("#againPwd").blur(function() {
            var temp= $("#firstPwd").val();
            var num = $("#againPwd").val().length;
            if($("#againPwd").val() != temp) {
                $(".aginpwd-tip").html("密码输入不一致");

            } else if(num != $("#firstPwd").val().length) {
                $(".aginpwd-tip").html("密码长度不一致");
            } else {
                $(".aginpwd-tip").html("");
            }

        });

        $(".savebtn").on("click", function() {
            var flag = true;
            var currentPwd = $("#currentPwd").val();
            var firstPwd = $("#firstPwd").val();
            var againtPwd = $("#againPwd").val();
            var num1 = firstPwd.length;
            var num2 = againtPwd.length;
            if(num1!=num2 || firstPwd != againtPwd || num1<6 || num1>18 || num2<6|| num2>18) {
                flag = false;
            } else {
                flag = true;
            }
            if(flag) {
                console.log(1);
                $.ajax({
                    url:"",
                    data: {
                        oldPwd: currentPwd,
                        newPwd: firstPwd
                    },
                    success: function(e) {
                        if(e.code ==1) {
                            Global.dialog(1,"密码修改成功");
                            $("#currentPwd").val("");
                            $("#firstPwd").val("");
                            $("#againPwd").val();
                            $(".tips").empty();
                            $("#div1").delay(200).hide();

                        } else {
                            Global.dialog(0,"老密码错误");
                        }
                    }
                })
            } else {
               //$("body").append(Global.dialog.getHtml({iscorrect:0,title:"注意提示"}));
            }

            /*if($("body").hasClass("dialog")) {
                console.log(1);
                return false;
            }*/

        });

});


