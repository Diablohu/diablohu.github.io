
/*条目修改js*/
var Global = typeof Global =='undefined' ? {} : Global;
$(function() {
    //上传图片

    //文件上传地址
    var url = '';
    //初始化，主要是设置上传参数，以及事件处理方法(回调函数)
    $('#fileupload').fileupload({
        autoUpload: true,//是否自动上传
        url: url,//上传地址
        dataType: 'json',
        done: function (e, data) {//设置文件上传完毕事件的回调函数
            $("#preview").show().attr({src:data.result.imgurl});
            //alert(data.result);
        }

    });

    Global.roleCont= {
        nameHasValue: function() {
            var oldName = $('.old-name-ipt');
            if(oldName.val() != '') {
                oldName.attr('readonly',true);
                oldName.addClass('gry-txt');
            }
        },
        addLine:function(formClass) {
            var $form = $(formClass);
            var self = this;
            $(document).on('focus', 'input[type=text], .area-ipt',function(e) {
                $('.b-line').removeClass('b-line');
                $(this).addClass('b-line');
            });
            $(document).on('blur', 'input[type=text], .area-ipt',function(e) {
                $('.b-line').removeClass('b-line');
            });
            
            //焦点框消失提示
            $('.role-form input[type!="submit"]').focus(function() {
                $(this).next('.error-tips').hide();
            }).blur(function() {
                var flag= self.roleTest();
                if(!flag) {
                    $(this).next('.error-tips').show();
                }
            });
        },
        roleTest: function() {
            var oldName = $('.old-name-ipt').val();
            if (oldName == '') {
                $('.error-r-name').html('对不起原名不能为空').show();
                return false
            } else {
                $('.error-r-name').hide();
            }
            return true;
        },

        addOhterName:function($self) {
            var inputHtml= '<input type="text" class="add-ipt other-name-ipt" placeholder="别名">';
            $($self).before(inputHtml);
        },
        sendAjax: function(opt) {
            var self = this;
            $.ajax({
                url: '/dmbk-role/assets/js/personitem/ajax.txt',
                dataType: 'json',
                type: 'post',
                data: opt,
                success: function(data) {
                    console.log(data);
                },
                error: function(err) {
                    console.log(err);
                }

            });

        },
        WriteOtherName: function() {
            var sname = '';
            var $otherLen = $(document).find('.other-name-ipt');
            var ohterArr = [];
            $otherLen.each(function(i,ele) {
                if($(ele).val() != '') {
                    ohterArr.push($(ele).val());
                }
            });
            return ohterArr.join(',');
        },
        init: function() {
            var self= this;
            this.addLine('.role-list');


            $('.role-s-btn').on('click',function() {
                var other = self.WriteOtherName();
                var conf= {
                    oldName:$('.old-name-ipt').val(),
                    chnName:$('.CHN-ipt').val(),
                    otherName: other,
                    job: $('.job-sel').val()

                };
                
                var canSubmit = self.roleTest();
                if(canSubmit) {
                    self.WriteOtherName();
                    self.sendAjax(conf);
                    console.log('ajax');

                }else {
                    return false;
                }
            });
            

            $('.add-other-name').on('click',function() {
                self.addOhterName($(this));
            });
        }
    }
    Global.roleCont.init();

});


