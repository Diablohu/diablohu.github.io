/*弹层逻辑*/
var Global = typeof Global =='undefined' ? {} : Global;
$(function() {
    Global.pop = {
        popHtml: function(opt) {
            var phtml = '',
                url = '';
            if (opt.iscorrect) {
                url = '<img src="">';
            } else {
                url = '<img src="">';
            }

            phtml = '<div class="cover"></div>'
            +'<div class="msg">'
            + '<div class="msg-title"><h3>'+opt.title+'</h3></div>'
            + '<div class="msg-errpic">' + url + '</div>'
            + '<div class="msg-description">'
            + '<h2> ' + opt.hintinfo + '</h2>'
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
                    window.location.href = 'http://www.baidu.com';
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
    /*iscorrect为提示类型，是正确还是错误icon*/
    /*title 提示的文案*/
    Global.dialog ={
        getHtml: function(opt) {
            if (opt.iscorrect) {
                url = '<img src="./assets/img/smile.png">';
            } else {
                url = '<img src="./assets/img/deject.png">';
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
    function setcookie(name,vaule,path) {

    }

    /*全站评论弹框调用*/

    Global.commentDiago= {
        renderHtml: function(opt) {
            var topTitle= '<div class="overlay"><form class="o-cont pr"><h2><span class="close"></span></h2><ul class="o-info">';
            var thinkDo, myApprise, multiIpt,offenIpt,shortComment,bottomHtml;
            var ping = ["很差","较差","还行","推荐","力荐"];
            var thinkDoArr = ["想看","在看","看过","搁置","抛弃"];
            var goodDisArr = ["剧情","画面","音乐","人设","声优"]
            var myLabel = ["动画","动画","动画","动画","动画"];
            var commonLabel = ["动画","动画","动画","动画","动画"];
            var pingHtml = [];
            var thinkDoContent = [];
            var goodDisStr =[];
            var myLabelStr = [];
            var commonLabelStr = [];
            var starHtml = '<div class="pingStar fl">';
        
            for(var i = 0;i < ping.length;i++){
                pingHtml.push('<a data-val="' + (i + 1) + '" href="javascript:;" data-title="' + ping[i] + '"></a>');
            }

            starHtml = starHtml + pingHtml.join("") + '<span id="dir"></span></div> <input type="hidden" value="" id="startP">';

            if(opt.thinkDo) { //thinkDo 是否显示想看，在看，看过的标签
                thinkDo = '<li><span class="h2-txt">记录:<i class="do-txt"></i></span><input type="hidden" name="todo"></li><li><div class="o-todo">';
                
                for(var i = 0;i < thinkDoArr.length;i++){
                    if(i == 0){
                        thinkDoContent.push('<a href="javascript:;" class="t-on">' + thinkDoArr[i] + '</a>');
                    }else{
                        thinkDoContent.push('<a href="javascript:;">' + thinkDoArr[i] + '</a>');
                    }                   
                }
                thinkDo = thinkDo + thinkDoContent.join("") + '</div></li>';
            }
            if(opt.myApprise) {
                myApprise = '<li>'
                    +'<div class="apprise doc-apprise clear">'
                    +'<span class="star-left fl">我的评价(可选)</span>'
                    + starHtml+'</div>'
                    +'</li>';
            };
            if(opt.multiIpt) {
                for(var i = 0; i  <goodDisArr.length; i++) {
                    goodDisStr.push('<label class="check-label" for="' + "dis" + i + '"><b class="icon icon-checkbox icon-l" data-value="' + goodDisArr[i] + '"></b><input type="checkbox" name="juqing" id="' + "dis" + i + '">' + goodDisArr[i] + '</label>');
                }
                multiIpt = '<li><div class="good-apprise"><span>分项好评 </span><span>';
                multiIpt = multiIpt + goodDisStr.join("") + '<input type="hidden" class="hide-good" value/></span></div></li>';
            }
            if(opt.offenIpt) {
                offenIpt = '<li><div class="o-label"><p>标签（多个标签用空格分隔）</p><input type="text" name="label-name" value="" class="lab-ipt"></div></li><li><div class="my-lab mt10 clear"><span>我的标签</span><p class="lab-list">';
                  
                for(var i = 0;i < myLabel.length;i++){
                    myLabelStr.push('<span>' + myLabel[i] + '</span>');
                }
                  
                offenIpt = offenIpt + myLabelStr.join("") + '</p></div></li><li><div class="my-lab  mt10 clear"><span>常用标签</span><p class="lab-list">';
               
                for(var i = 0;i < commonLabel.length;i++){
                    commonLabelStr.push('<span>' + commonLabel[i] + '</span>');
                }

                offenIpt = offenIpt + commonLabelStr.join("") + '</p></div></li>';
            }
            if(opt.shortComment) {
                shortComment= '<li>'
                    +'<p class="clear">简评 <span class="cur-num fr">140</span></p>'
                    +'<textarea class="ipt-intro"></textarea>'
                    +'</li>';
            }

            if(opt.bottom) {
                bottomHtml = '<li>'
                +'<span>分享到</span>'
                +'<label class="my-video" for="video">'
                +'<i class="icon icon-checkbox"></i>'
                +'<input type="checkbox" name="video" id="video"> 我的广播</label>'
                +'<input type="button" class="pop-save" value="保存">'
                +'</li>';
            }
            var rhtml= topTitle+thinkDo+myApprise+multiIpt+offenIpt+shortComment+bottomHtml+'</ul>';

            return rhtml;
        },
        close: function() {
            $(document).on('click','.close', function() {
                $('.doc-apprise a').removeClass('ping-on');
                $('.overlay').hide();
            });
        },
        tinkDo: function() {
            var onTitle = '';

            $(document).on('click','.o-todo a', function() {
               $(this).addClass('t-on').siblings().removeClass('t-on');
               onTitle =$(document).find('.t-on').text();
               $(document).find('.do-txt').text(onTitle);
            });

        },
        goodDiscuss: function() {
            var goodAll=[],
                Gindex = '';
            $(document).on('click','.check-label', function(e) {
                e.preventDefault();
             if(!$(this).find('b').hasClass('apprise-on')) {
                    $(this).find('b').addClass('apprise-on');
                    $(this).css('color','#67bdcd');
                    goodAll.push($(this).find('b').data('value'));

                } else {
                    $(this).find('b').removeClass('apprise-on');
                    $(this).css('color','#888');
                    Gindex= goodAll.indexOf($(this).find('b').data('value'));
                    goodAll.splice(Gindex,1);

                }
                var goodAlljoin = goodAll.join(';');
                $('body').find('.hide-good').attr('value',goodAlljoin).change();
            });
        },
        verticalCenterPop: function(popName) {
            var _winH = $(window).height();
            var _winW = $(window).width();
            var _popH = $(popName).height();
            var popW = $(popName).width();
            var posTop = (_winH-_popH)/2 ;
            var posLeft = (_winW-popW)/2;
            $(popName).css({"left":posLeft+"px","top":posTop+"px"});

        },
        chooseMark: function() {
            arrMark = [],
            indexMark = '';
           $(document).on('click','.lab-list span', function() {
               if(!$(this).hasClass('mark-on')) {
                   $(this).addClass('mark-on');
                   arrMark.push($(this).text());
                   //console.log(arrMark);
               }else {
                   $(this).removeClass('mark-on');
                   indexMark = arrMark.indexOf($(this).text());
                   arrMark.splice(indexMark,1);
                   //console.log(arrMark);
               }
               var arrMarkJoin = arrMark.join(" ");

               $('.lab-ipt').attr('value', arrMarkJoin);

           });

        },
        countWord: function() {
            var shortCommetValue =$(".ipt-intro").val();
            var shortCommetLen = '';
            var maxLen= 140;
            $('.cur-num').text(maxLen);
            $(document).on('input propertychange', '.ipt-intro', function() {//propertychange for ie,input for chrome firefox
               /* var shortCommetValue = $(".ipt-intro").val();*/
                var shortCommetLen = $(".ipt-intro").val().length;
                var value = $(this).val();
                var valLen = $(this).val().length;
                if(valLen > maxLen) {
                    $(this).val(shortCommetValue);
                    return;
                } else {
                    shortCommetValue = value;
                }
                $('.cur-num').text(maxLen-valLen);
            });

            $(document).on('keyup', '.ipt-intro', function(e) {
                if(e.keyCode == 8) {
                    var value = $(this).val();
                    var valLen = value.length;
                    $(".cur-num").text(valLen);
                }

            });

        },


        init: function() {
            this.close();
            this.tinkDo();
            this.goodDiscuss();
            this.chooseMark();
            this.countWord();




        }
    }
    Global.commentDiago.init();
});

