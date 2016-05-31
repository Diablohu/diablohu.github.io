
/*条目修改js*/
var Global = typeof Global =='undefined' ? {} : Global;
$(function() {

    Global.animateCont= {
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
            $(formClass+' input[type!="submit"]').focus(function() {
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
                url: '/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/animatesummary/ajax.txt',
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
        wikiLogic:function() {
            var themeCont= $('.type-list');
            var themeLen= themeCont.find('li').length;
            var wikiArr=[];
            if(themeLen>9) {
                themeCont.find('li').slice(8).addClass('excess-hide');
                var lastAppendA = '<a href="javascript:;"  class="list-all">展开全部</a>'
                $('.type-list').append(lastAppendA);
            }
            $(document).on('click','.type-list li', function () {
                if(!($(this).hasClass('wiki-on'))) {
                    $(this).addClass('wiki-on');
                    var text= $(this).text();
                    wikiArr.push(text);

                } else {
                    $(this).removeClass('wiki-on');
                    var index= wikiArr.indexOf($(this).text());
                    wikiArr.splice(index,1);
                }
                var wikiList= wikiArr.join(',');
            });
            $(document).on('click','.list-all', function() {
                $('.type-list').find('li').removeClass('excess-hide');
                $(this).remove();
            });

        },
        init: function() {
            var self= this;
            this.wikiLogic();
            this.addLine('.animate-list');


            $('.animate-s-btn').on('click',function() {
                var other = self.WriteOtherName();
                console.log(other);
                var conf= {
                    oldName:$('.old-name-ipt').val(),
                    chnName:$('.CHN-ipt').val(),
                    otherName: other,
                    dtype: $('.job-sel').val(),
                    wikilist: wiki

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
    Global.animateCont.init();

});


