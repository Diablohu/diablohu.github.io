$(function(){

    //我的广播
    $(document).on('click','.my-video', function(e) {
        e.preventDefault();
        if(!($(this).find('i').hasClass('boradCheck'))) {
            $(this).find('i').addClass('boradCheck');
        }else {
            $(this).find('i').removeClass('boradCheck');
        }

    });

    $(document).on('click','.pop-save', function() {
        $('.overlay').remove();

    });

    /*评分功能*/
    function Star(parent) {
        var star = $(parent +" .pingStar"),
            dir = $(parent +' #dir'),
            starA = $(parent +" .pingStar a"),
            input = $(parent +' #startP');  //保存所选值

        //去掉所有的样式
        var clearAll= function() {
            for(var i=0; i<starA.length; i++) {
                $(parent +' .ping-on').removeClass('ping-on');
            }
        };
        function fn1(index,dataVal) {
            var len = $(parent +" .pingStar").find('a').length;
            clearAll();
            input.val(dataVal);
            if(index < dataVal) {
                for(var i=0; i<dataVal; i++) {
                    $(parent +" .pingStar").find('a').slice(0,i+1).addClass('ping-on');
                    $(parent +" .pingStar").find('a').slice(i+1,len).removeClass('ping-on');
                }
            }
            var pingTxt = $(parent +' .pingStar').find('a').eq(index).attr('data-title');
            $(parent +' #dir').text(pingTxt);
        }
        var isClick = false;
        var clickIndex = 0;
        var index = 0;
        $(document).on('click',parent +' .pingStar a', function(e) {
            var dataVal = $(this).attr('data-val');
            clickIndex = $(this).index();
            fn1(clickIndex,dataVal);
            isClick = true;
        });

        if(!isClick) {
            $(document).on('mouseover',parent +' .pingStar a', function(e) {
                var dataVal = $(this).attr('data-val');
                index = $(this).index();
                fn1(index,dataVal);
            });
            $(document).on('mouseleave',parent +' .pingStar a', function(e) {
                var dataVal = $(this).attr('data-val');
                var len = $(parent +" .pingStar").find('a').length;
                index = $(this).index();
                clearAll();
                input.val(dataVal);
                if(index < dataVal) {
                    if(!isClick){
                        for(var i=0; i<=index; i++) {
                            $(parent +" .pingStar a").eq(i).removeClass('ping-on');
                        }
                    }else{
                        for(var i=0; i<=clickIndex; i++) {
                            $(parent +" .pingStar").find('a').slice(0,i+1).addClass('ping-on');
                            $(parent +" .pingStar a").slice(i+1,len).removeClass('ping-on');
                        }
                    }
                }

                $(parent +' #dir').text('');

            });
        }else {
            isClick = false;
        }
    }

    Star('.do-apprise2');
    Star('.do-apprise');
    Star('.my-apprise');
    Star('.doc-apprise');

});