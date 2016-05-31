var Global = typeof Global =='undefined' ? {} : Global; 
$(function() {
	/*iscorrect为提示类型，是正确还是错误icon*/
    /*title 提示的文案*/
    Global.dialog ={
        getHtml: function(opt) {
            if (opt.iscorrect) {
                url = '<img src="http://img.mh.9724.com/acgn_wiki/tms/images/smile.png">';
            } else { 
                url = '<img src="http://img.mh.9724.com/acgn_wiki/tms/images/deject.png">';
            }
            var html = ''
                +'<div class="dialog">'
                + '<p><b class="bi">'+url+'</b>'+opt.title+'</p>'
                +'</div>';

            return html;

        },
        init: function() {
            getHtml();
        }
    };
});
