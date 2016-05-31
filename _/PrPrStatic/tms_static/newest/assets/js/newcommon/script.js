/*new common*/
var animateCont= {
    fixNav: function (){
        var body= $(body);
        var topH= $('.top-banner').height();
        if(animateCont.scrollNav) clearTimeout(animateCont.scrollNav);
        animateCont.scrollNav= setTimeout(function() {
            if($(document).scrollTop() > topH-50) {
                $('body').addClass('fix-warp');
            } else {
                $('body').removeClass('fix-warp');
            }
        },100);

    },
    _IE: (function(d, w) {
        return d.querySelector ? d.documentMode : (d.compatMode == "CSS1Compat" ? "XMLHttpRequest" in w ? 8 : 7 : 6);
    }(document, this)),
    adaptiv:function() {
        var currentWidth = $(window).width();
        if(currentWidth < 1280) {
            $('body').addClass('ie-w1280');
        }else {
            $('body').removeClass('ie-w1280');
        }
        url="/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/animatelist/otherrole.json";
    },
    init: function() {
        var self= this;
        $(window).bind('scroll',self.fixNav);
        if ( self._IE != undefined && self._IE < 9) {
            self.adaptiv();
            animateCont.resizeTimeout = null;
            $(window).on('resize', function() {
                var resizeTimeout = animateCont.resizeTimeout;
                if(resizeTimeout) clearTimeout(resizeTimeout);
                animateCont.resizeTimeout = setTimeout(function(){
                    self.adaptiv();
                    if(resizeTimeout) clearTimeout(resizeTimeout);
                },200);

            });

        }
    }
}

$(function(){
    animateCont.init();
});