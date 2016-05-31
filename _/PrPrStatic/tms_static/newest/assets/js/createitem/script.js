
/*完善动画条目js*/

$(function() {
    createItem= {
        addLine:function(formClass) {
            var $form = $(formClass);
            var self = this;
            $(document).on('focus', formClass+' input[type=text], .area-ipt',function(e) {
                $('.b-line').removeClass('b-line');
                $(this).addClass('b-line');
            });
            $(document).on('blur', formClass+' input[type=text], .area-ipt',function(e) {
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
            var oldName = $('.product-ipt').val();
            if (oldName == '') {
                $('.error-name').html('对不起你没有填写原名').show();
                return false
            } else {
                $('.error-name').hide();
            }
            return true;
        },

        init: function() {
            var self= this;
            this.addLine('.add-form');

            $(document).on('click','.additem-btn', function() {
                var canSubmit = self.roleTest();
                if(!canSubmit) {
                    return false;
                }
                $('.search-result').show();
            });

        }
    }
    createItem.init();

});


