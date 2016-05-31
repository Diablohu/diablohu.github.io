/*新番页面js*/

  var fixedNav= {
      init: function() {
          this.fixWrap= $('#fixedCont');
          this.topBtn= this.fixWrap.find('.gotop');
          if(window.screen.width < 1024) {
              this.fixWrap.remove();
              return;
          }
          this.scroll();
          this.topBtn.on('click', this.goTop);
          $(window).bind('scroll',this.scroll);
      },
      goTop: function() {
          $('body, html').animate({
              scrollTop:0
          },400);
      },
      scroll: function() {
          if(fixedNav.scrollTime) clearTimeout(fixedNav.scrollTime);
          fixedNav.scrollTime= setTimeout(function() {
              if($(document).scrollTop() < 200) {
                  fixedNav.topBtn.hide();
              } else {
                  fixedNav.topBtn.show();
              }

          },100);
      }
  };

var winSize= {
    autoImg: function () {
        var w = $(window).width();
        var h = $(window).height();
        var $ImgWrap = $('.new-scroll');
        var lastH = Math.ceil((w * 91) / 320);
        $ImgWrap.css({"height": $ImgWrap, "width": w});

    },

    resize: function() {
        var self= this;
        setTimeout(function() {
            self.autoImg();
        },300);

    },
    init: function() {
        this.autoImg();
        var self = this;
        $(window).bind('resize',function(){
            self.resize();
        });
    }

};

var ImgCont= {
    bgShow: function() {
        this.newList= $('.new-list');

        var defaultImg = $('.new-cartoon').attr('data-defaultbg');
        if(defaultImg) {
            $('.new-cartoon').css('background-image','url('+defaultImg+')').fadeIn(3000);
        }
        this.newList.on('mouseenter','>li',function(e) {
            e.stopPropagation();
            e.preventDefault();
            $(this).addClass('show-sub');
            var newBg= $(this).find('.new-img').attr('data-bg');
            var handBg= $(this).find('.new-img').attr('data-hand');
            if(newBg) {
                $('.new-cartoon').css('background-image','url('+newBg+')').fadeIn(3000);
            }
            if(handBg) {
                $('.new-cartoon').find('.hand-l').fadeIn().find('img').attr('src',handBg);
                $('.new-cartoon').find('.hand-r').fadeIn().find('img').attr('src',handBg);
                var toTop = $(this).position().top;
                $('.hand-pic').css({
                    top: toTop+'px'
                });
            }

        });
        this.newList.on('mouseleave','>li',function(e) {
            $('.new-cartoon').css('background-image','url('+defaultImg+')').fadeIn(300);
            $('.hand-pic').hide();
        });
        this.newList.on('mouseleave','>li',function(e) {
            $(this).removeClass('show-sub');
        });
        this.newList.on('mouseenter','.show-mask', function(e) {
            var ahtml= '<span class="bg-show"><span class="hover-play"></span></span>';
            $(this).append(ahtml);
        });

        this.newList.on('mouseleave','.show-mask', function(e) {
            $(document).find('.bg-show').remove();
        });
        this.newList.on('click','>li',function(e) {
            var href= $(this).find('.new-img').attr('href');
            window.open(href, 'target="_blank');
        });
        $(document).on('click','.bg-show', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var href= $(this).parent('.show-mask').attr('href');
            window.open(href, 'target="_blank');
        });
        $(document).on('click','.link-img', function(e) {
            e.stopPropagation();
            e.preventDefault();
            var href= $(this).attr('href');
            window.open(href, 'target="_blank');
        });

    },
    handLogic:function() {/*运营配置的图片小于1024不显示*/
        var w = $(window).width();
        this.newList= $('.new-list');
        if(w < 1200) {
            this.newList.on('mouseenter','>li',function(e) {
                $('.hand-pic').hide();
            });
        }
    },
    resize:function() {
        var self= this;
        self.handLogic();

    },
    init: function() {
        this.bgShow();
        this.handLogic();
        //var self = this;
        /*$(window).on('resize', function() {
            self.resize();
        });*/
    }
}


$(function(){
    $('#myCarousel').carousel({
        interval: 2000
    });
    $('.n-publish').on('submit',function() {
        if(!($('#commend').val())) {
            return;
        }
    });

    fixedNav.init();
    winSize.init();
    ImgCont.init();
    $("img.lazy").lazyload();
    Global.dm.reply(null,'.reply-btn');

});