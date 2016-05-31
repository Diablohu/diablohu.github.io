/*弹层逻辑*/
 
var Global = typeof Global =='undefined' ? {} : Global;
Global.pop = {
    popHtml: function(title, iscorrect, hintinfo) {
        var phtml = '',
            url = ''; 
        if (iscorrect) {
            url = '<img src="">';
        } else {
            url = '<img src="">';
        }
        
        phtml = '<div class="cover"></div>'
        +'<div class="msg">' 
        + '<div class="msg-title"><h3>'+title+'</h3></div>' 
        + '<div class="msg-errpic">' + url + '</div>' 
        + '<div class="msg-description">' 
        + '<h2> ' + hintinfo + '</h2>' 
        + '<p>系统将在<span id="timer">3</span>秒后跳转，如果不能等待，直接 <a href="javascript:void(0)" class="pop-c">点击</a> 这<br>里跳转 或者 <a href="javascript:void(0)" class="pop-h">返回首页</a></p>' 
        + '</div>' + '</div>';
        return phtml;
    },
    countDown: function() {
        var init = 3;
        var t1 = setInterval(function() {
            init--;
            if (init < 0) {
                clearInterval(t1);
            } else {
                $("#timer").html(init);

            }

        }, 1000);
    },
    bind: function() {
        $(document).on('click','pop-c', function(e) {
            window.location.href = 'http://www.baidu.com';
        });

        $(document).on('click','pop-h', function(e) {
            window.location.href = '/index/';
        });
    },
    init: function() {
       

    }
};