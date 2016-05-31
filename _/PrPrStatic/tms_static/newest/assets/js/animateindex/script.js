/*动画首页*/
$(function(){
var animateCont= {
    thinkDo:function() {
        $(this).siblings().removeClass('do-on');
        $(this).addClass('do-on');
        var uDo= $('.user-do .do-on').attr("data-val");
        $('input[name="user-do"]').val(uDo);
    },
    star: function(parent) {/*评分功能*/
        var self = this;
        var star = $(parent +" .f-list "),
            starLi = $(parent +" .f-list li"),
            input = $(parent +' .ipt-user-n'),//保存所选值
            saveVal = input.val();
            var len = $(".n-cont .f-list").find('li').length;
            var isClick = false;
            if(saveVal) {
                $(".n-cont .drag-line").show().css('left',saveVal+'0%');
                for(var i=0; i<saveVal; i++) {
                    $(".n-cont .f-list").find('li').slice(0,i+1).addClass('num-on');
                }
            } else {
                $(".n-cont .drag-line").hide().css('left','0');
                
            }

        //去掉所有的样式
        var clearAll= function() {
            if(saveVal) {
                return;
            }
            for(var i=0; i<starLi.length; i++) {
                $(parent +' .num-on').removeClass('num-on');
            }
        };

        function fn1(index,dataVal) {
            var len = $(parent +" .f-list").find('li').length;
            clearAll();
            input.val(dataVal);
            $(parent +" .drag-line").show().css('left',dataVal+'0%');
            if(index < dataVal) {
                for(var i=0; i<dataVal; i++) {
                    $(parent +" .f-list").find('li').slice(0,i+1).addClass('num-on');
                    $(parent +" .f-list").find('li').slice(i+1,len).removeClass('num-on');
                }
            }
        }
        var clickIndex = 0;
        var index = 0;
        
        var clickValue = 0;
            $(document).on('click',parent +' .f-list li', function(e) {
                var dataVal = $(this).attr('data-val');
                clickIndex = $(this).index();
                clickValue = dataVal;
                fn1(clickIndex,dataVal);
                $(parent +" .drag-line").css('left',clickValue+'0%');
                isClick = true;
                
            });
            if(!isClick) {
                    $(document).on('mouseenter',parent +' .f-list li', function(e) {
                        var dataVal = $(this).attr('data-val');
                        index = $(this).index();
                        fn1(index,dataVal);
                    });
                    $(document).on('mouseleave',parent +' .f-list li', function(e) {
                        var dataVal = $(this).attr('data-val');
                        var len = $(parent +' .f-list li').length;
                        index = $(this).index();
                        clearAll();
                        input.val(dataVal);

                        if(index < dataVal) {

                            if(!isClick && !saveVal){
                                for(var i=0; i<=index; i++) {
                                    $(parent +' .f-list li').eq(i).removeClass('num-on');
                                }
                                $('.drag-line').hide();
                            }else{
                                if(isClick) {
                                   for(var i=0; i<=clickIndex; i++) {
                                        $(parent +' .f-list li').slice(0,i+1).addClass('num-on');
                                        $(parent +' .f-list li').slice(i+1,len).removeClass('num-on');
                                   
                                    }
                                    $(".n-cont .drag-line").show().css('left',clickIndex+1+'0%');
                                }else {
                                   for(var i=0; i<=saveVal; i++) {
                                        $(parent +' .f-list li').slice(0,i).addClass('num-on');
                                        $(parent +' .f-list li').slice(i,len).removeClass('num-on');
                                   
                                    }
                                    $(".n-cont .drag-line").show().css('left',saveVal+'0%');
                                }
                                

                            }
                        }
                    });

                    /*$(document).on('mouseleave','.n-cont', function(e) {
                        $(".n-cont .drag-line").show().css('left',saveVal+'0%');
                        //$(parent +" .drag-line").css('left',saveVal+'0%');
                    });*/

            }else {
                isClick = false;
               
            }
    },
    imgAdaptive:function() {
        var pWin = '',
            phei = '';
        var Win= $(window).width();
        var imgB = $('.banner-hidden');
        var scrollH = "";
        var autoH = '';
        var viewHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                       document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
        
        function onload(){
            pWin = imgB.width();
            phei = imgB.height();

            var bannerInner= $('.banner-inner');
            var  autoH=Win*phei/pWin;
            var $window = $(window)
            scrollH=autoH/4;
            bannerInner.height(autoH);
            bannerInner.find('.aut-img').addClass('loaded')
            bannerInner.css ('transform', 'translateY('+scrollH+'px)');
            //$(window).scrollTop(scrollH-2);
            $window.on('scroll',function(){
                var iTOp = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                $('.banner-inner').css ('transform', 'translateY('+iTOp/2+'px)');
            });
            
            var viewHeightNew = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                       document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
            
            //console.log( scrollTop, viewHeightNew, viewHeight )
            $window.scrollTop( scrollTop + viewHeightNew - viewHeight );
        }
        
        imgB.load( onload );
        
        if( imgB[0].complete || (typeof imgB[0].naturalWidth !== "undefined" && imgB[0].naturalWidth === 0) ){
            onload();
        }

    },
    hovePlay:function() {
        $('.friend-discuss').find('a').on('mouseover',function(e) {
            $(this).addClass('d-on').siblings('a').removeClass('d-on');
            var contClass= $(this).data('cont');
            $('.dis-main').find('.'+contClass).show().siblings().hide();
        });

    },
    init: function() {
        var self= this;
        self.hovePlay();
        self.imgAdaptive();
        $('.user-do li').bind('click',self.thinkDo);
        var uDo= $('#is_see').val();
        $('input[name="user-do"]').val(uDo);
        animateCont.resizeTimeout = null;
        $(window).on('resize', function() {
            var resizeTimeout = animateCont.resizeTimeout;
            if(resizeTimeout) clearTimeout(resizeTimeout);
            animateCont.resizeTimeout = setTimeout(function(){
                self.imgAdaptive();
                if(resizeTimeout) clearTimeout(resizeTimeout);
            },200);
        });
    }
}

    animateCont.init();
    animateCont.star('.n-cont');

    $('.u-form').on('submit', function(e) {
        if($(".user-input").val() == "") {
            return false;
        }
    });
});
