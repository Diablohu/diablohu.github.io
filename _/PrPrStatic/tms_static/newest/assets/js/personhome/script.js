/*广播列表， 广播， 个人主页js*/
$(function(){
    person = {
        zan: function() {
            var $zan = $('.item-zan');
            var iszan = false;
            $zan.on('click', function() {
                var zanNum = parseInt($(this).find('.pl-num').html());
                if(iszan) {
                    $(this).removeClass('item-zan-on');
                    $(this).find('.pl-num').html(zanNum -1);
                    iszan = false;
                } else {
                    $(this).addClass('item-zan-on');
                    $(this).find('.pl-num').html(zanNum+1);
                    iszan = true;
                }

            });

        },
        discuss: function() {
            var $discuss= $( '.item-pl');
            $discuss.on('click', function() {
                var display = $(this).parent().parent().siblings('.discuss');
                if( display.css('display') == 'none') {
                    $(this).addClass('dark-color');
                    display.slideDown();
                } else {
                    $(this).removeClass('dark-color');
                    display.slideUp();
                }

            });
        },
        publish:function(id,username,text) {

            $ajax({
                url:'',
                type: 'post',
                data: {
                    text: text,
                    id: id,
                    username: username
                },
                success: function(data){
                    if(data.success){

                    }else{

                    }

                },
                error: function() {

                }
            });

        },
        reply:function(){
            console.log(2);

        },
        bind: function(bindbtn,handler) {
            var self = this;
            
            $(bindbtn).on(handler, function(){
                if($(this).hasClass('publish-btn')){
                    self.publish();
                } else {
                    self.reply();
                }
            });
        },
        init:function() {
            this.bind(".publish-btn",'click');
            this.bind(".reply-btn",'click');
            this.zan();
            this.discuss();
        }
    };

    person.init();



});