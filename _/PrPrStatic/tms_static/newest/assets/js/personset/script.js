$(function() {
    $('body').append(Global.dialog.getHtml({'iscorrect':true,'title':"成功"}));
    setTimeout(function() {
        $('.dialog').hide();
    },3000);
    /*个人设置相关js*/
    var Personset = {
        isCheck: true,
        selectSex: function() {
            var check = '.check-radio';
            $(document).on('click', check,function() {
                $(this).addClass('check-bg').siblings().removeClass('check-bg');
            });
        },
        verifyNick: function(node) {
            var s = node;
            if (s.match(/^[\u4e00-\u9fa5a-zA-Z0-9_]+$/)) {
                return true;
            };
        },
        CheckUrl: function (str_url){
            var strRegex = "^((https|http|ftp|rtsp|mms)?://)"
                + "?(([0-9a-z_!~*'().&=+$%-]+: )?[0-9a-z_!~*'().&=+$%-]+@)?" //ftp的user@
                + "(([0-9]{1,3}\.){3}[0-9]{1,3}" // IP形式的URL- 199.194.52.184
                + "|" // 允许IP和DOMAIN（域名）
                + "([0-9a-z_!~*'()-]+\.)*" // 域名- www.
                + "([0-9a-z][0-9a-z-]{0,61})?[0-9a-z]\." // 二级域名
                + "[a-z]{2,6})" // first level domain- .com or .museum
                + "(:[0-9]{1,4})?" // 端口- :80
                + "((/?)|" // a slash isn't required if there is no file name
                + "(/[0-9a-z_!~*'().;?:@&=+$,%#-]+)+/?)$";
            var re=new RegExp(strRegex);
            //re.test()
            if (re.test(str_url)){
                return (true);
            }else{
                return (false);
            }
        },
         checkInfo: function() {
            var nickNode = $('.nickname').val();
            var domain = $('.domain').val();

            if(!this.verifyNick(nickNode)) {
                $('.nick-tips').html('请输入正确的用户名').show();
                $('.nickname').focus();
                return false;
            } else {
                $('.nick-tips').hide();
            }
            if(nickNode == '') {
                $('.nick-tips').html('请输入邮箱').show();
                return false;
            }else {
                $('.nick-tips').hide();
            }
            if(!this.CheckUrl(domain)) {

                $('.url-tips').html('请输入正确的url').show();
                return false;
            }else {

                $('.url-tips').hide();
            }
            if(nickNode == '') {
                $('.url-tips').html('请输入url').show();
                return false;
            }else {
                $('.url-tips').hide();
            }

            return true;
        },
        setSubmit: function() {
            var savebtn = '.savebtn';
            var _this = this;
            $(savebtn).on('click', function (e) {
                e.preventDefault();
                var flag = _this.checkInfo();
                console.log(flag)
                if(flag) {
                    this.sendAjax();
                } else {
                    return false;
                }
            });

        },
        sendAjax: function() {
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '',
                data: {

                },
                success: function(data) {
                    //
                    $('body').append(Global.dialog.getHtml({'iscorrect':true,'title':"成功"}));
                    setTimeout(function() {
                        $('.dialog').hide();
                    },300);
                },
                error: function(data) {

                }

            });
        },
        init: function() {
            var _this = this;
            this.selectSex();
            this.setSubmit();
            $('.set_form input[type!="submit"]').blur(function() {
                _this.checkInfo();
            });
        }
    };

    Personset.init();

    //二级联动
    var w1 = document.getElementById('w1');
    var c1 = document.getElementById('c1');
    var address = document.getElementById('address');
    var submit = document.getElementById('submit');
    var world = ['国家','中国','印尼','法国'];
    var country = {
        '0_0':['地区'],
        '0_1': ['地区','北京','香港','深圳'],
        '0_2': ['地区','雅加达','巴厘岛','印尼1'],
        '0_3': ['地区','巴黎','法国2','法国3']
    };

    var index = 0;
    function creatOpt(index,country) {
        for(var i=0; i< world.length; i++) {
            w1.options.add(new Option(world[i],world[i]));
        }
        chageW(index);
        w1.onchange = function() {
            index = w1.selectedIndex;
            chageW(index);
        }
    }

    function chageW(index) {
        c1.options.length = 0;
        if(index == 0) {
            c1.options.add(new Option(country['0_'+index],country['0_'+index]));

        } else {
            var countyi = country['0_'+index];
            for(var i=0; i<countyi.length; i++) {
                c1.options.add(new Option(countyi[i],countyi[i]));
            }
        }
        c1.onchange = function() {
            address.value = w1.value + c1.value;
        };
    }
    /*submit.onclick = function() {
        alert(address.value);
    }*/
    creatOpt(index);


});