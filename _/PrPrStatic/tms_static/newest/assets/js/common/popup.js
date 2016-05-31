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
            $(document).off('click','pop-c').on('click','pop-c', function(e) {
                window.location.href = 'http://www.baidu.com';
            });

            $(document).off('click','pop-h').on('click','pop-h', function(e) {
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
    /*全站*/

    /*全站评论弹框调用*/
    Global.commentDiago = function(opt){

        if(!(this instanceof Global.commentDiago)){
            return new arguments.callee(arguments[0]);
        }

        opt =  opt || {};

        var _winW = $(window).width();
        var _winH = $(window).height();
        var posLeft = "50%";
        var posTop = "50%";
        var posMarginLeft = 0;
        var posMarginTop = 0;
        var popW = 0;
        var popH = 0;
        var wrapStyle = "";
        var wrapClass = opt.className || "overlay";
        var wrapFromClass = opt.formName || "o-cont";
        var popWrap = "";

        var align = opt.align || "cm";
        var isHeader = opt.isHeader?opt.isHeader:false;
        var isClose = opt.isClose?opt.isClose:false;
        var initTitle = opt.initTitle || "想看";
        var closeClassName = opt.closeClassName || "close";
        var popContent = opt.popContent || "o-info"
        
        this.createWrap = function(){

            popWrap = '<div class="' + wrapClass + '" ><form class="' + wrapFromClass + '"><ul class="' + popContent +'"></form></div>';
            $("body").append(popWrap);       
            popW = $("." + wrapClass).width();
            popH = $("." + wrapClass).height();
            posMarginLeft = -(popW/2) + "px";
            posMarginTop = -(popH/2) + "px";

            switch(align){
                case "l":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;top:" + posTop + ";left:" + 0 + ";margin-top:" + posMarginTop;
                break;
                case "r":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;top:" + posTop + ";right:" + 0 + ";margin-top:" + posMarginTop;
                break;
                case "t":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;top:" + 0 + ";left:" + posLeft + ";margin-left:" + posMarginLeft;
                break;
                case "b":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;bottom:" + 0 + ";left:" + posLeft + ";margin-top:" + posMarginTop + ";margin-left:" + posMarginLeft;
                break;
                case "lt":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;top:" + 0 + ";left:" + 0
                break;
                case "rt":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;top:" + 0 + ";right:" + 0 
                break;
                case "lb":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;bottom:" + 0 + ";left:" + 0;
                break;
                case "rb":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;bottom:" + 0 + ";right:" + 0;
                break;
                case "cm":
                    wrapStyle = "display:block;width:" + popW + "px;height:" + popH + "px;top:" + posTop + ";left:" + posLeft + ";margin-top:" + posMarginTop + ";margin-left:" + posMarginLeft;
                break;
            }

            $("." + wrapClass).attr("style",wrapStyle);

            if(isHeader && isClose){
                this.createHeader(true,closeClassName,initTitle)
            }else if(isHeader){
                this.createHeader(false,closeClassName,initTitle)
            }

            return this;
        }

        this.createHeader = function(isClose,close,initTitle){
            var header = "";
            
            if(isClose){
                header = '<h2><span class="h2-txt">记录:<i class="do-txt">' + initTitle + '</i></span><span class="' + close + '"></span></h2>';        
            }else{
                header = '<h2><span class="h2-txt">记录:<i class="do-txt">' + initTitle + '</i></span></h2>';
            }
            
            $("." + popContent).before(header);

            if(isClose){
                this.close();
            }

            return this;
        }

        this.createToDo = function(data){
            var beginHTML = '<li><div class="o-todo">';
            var endHTML = '</div></li>';
            var toDoArr = [];

            for(var i = 0;i < data.length;i++){
                if(i == 0){
                    toDoArr.push('<a href="javascript:;" class="t-on">' + data[i] + '</a>');
                }else{
                    toDoArr.push('<a href="javascript:;">' + data[i] + '</a>');
                }
            }

            $("." + popContent).append(beginHTML + toDoArr.join("") + endHTML);

            this.bindToDoEvent = function(){
                var todo = $(".o-todo a");

                todo.on("click",function(){
                    todo.removeClass("t-on");
                    $(this).addClass("t-on");
                    $(".do-txt").text($(this).text());
                });

                return this;
            }

            this.bindToDoEvent();

            return this;
        }

        this.createApprise = function(data){
            var beginHTML = '<li><div class="apprise doc-apprise clear"><span class="star-left fl">我的评价(可选)</span><div class="pingStar fl">';
            var endHTML = '<span id="dir"></span></div> <input type="hidden" value="" id="startP"></div>';
            var toDoArr = [];

            for(var i = 0;i < data.length;i++){
                toDoArr.push('<a href="javascript:;" data-val="' + (i + 1) + '" data-title="' + data[i] + '"></a>');
            }

            $("." + popContent).append(beginHTML + toDoArr.join("") + endHTML);

            this.bindAppriseEvent = function(){
                var pingStar = $("." + wrapClass).find(".pingStar a");
                var pingStarWrap = $("." + wrapClass).find(".pingStar");
                var startP = $("#startP");
                var len = $(".pingStar a").length;
                var index = 0;
                var hoverIndex = 0;

                    pingStar.hover(function(){
                        hoverIndex = $(this).data("val");
                        pingStar.slice(0,index).removeClass("ping-on");
                        pingStar.slice(0,hoverIndex).addClass("ping-on");   
                        pingStarWrap.find("#dir").text($(this).data("title"));                
                    },function(){
                        pingStar.slice(0,hoverIndex + 1).removeClass("ping-on");                   
                    });

                    pingStarWrap.on("mouseleave",function(){
                        pingStarWrap.find("#dir").text("");
                        pingStar.slice(0,index).addClass("ping-on"); 
                    });

                    pingStar.on("click",function(){
                        index = $(this).data("val");
                        pingStar.slice(0,index + 1).addClass("ping-on");
                        pingStar.slice(index,len).removeClass("ping-on");
                        startP.val($(this).data("val"));
                    });

                return this;
            }

            this.bindAppriseEvent();

            return this;
        }

        this.createGoodsApprise = function(data,dataId){
            var beginHTML = '<li><div class="good-apprise"><span>分项好评 </span><span>';
            var endHTML = '<input type="hidden" class="hide-good" value/></span></div></li>';
            var toDoArr = [];

            for(var i = 0;i < data.length;i++){
                toDoArr.push('<label class="check-label" for="' + dataId[i] + '"><b class="icon icon-checkbox icon-l" data-value="' + data[i] + '"></b><input type="checkbox" name="' + dataId[i] + '" id="' + dataId[i] + '">' + data[i] + '</label>');
            }

            $("." + popContent).append(beginHTML + toDoArr.join("") + endHTML);

            this.createGoodsAppriseEvent = function(){
                var goodAlljoin = "";
                var goodAll = [];
                var Gindex = 0;

                $(document).off('click','.check-label').on('click','.check-label', function(e) {
                    e.preventDefault();
                    if(!$(this).find("b").hasClass('apprise-on')) {
                        $(this).find("b").addClass('apprise-on');
                        $(this).css('color','#67bdcd');
                        goodAll.push($(this).find("b").data('value'));
                    } else {
                        $(this).find("b").removeClass('apprise-on');
                        $(this).css('color','#888');
                        Gindex= goodAll.indexOf($(this).find("b").data('value'));
                        goodAll.splice(Gindex,1);
                    }

                    goodAlljoin = goodAll.join(';');
                    $('body').find('.hide-good').attr('value',goodAlljoin).change();
                });

                return this;
            }

            this.createGoodsAppriseEvent();
            return this;
        }

        this.createLabel = function(data){
            var beginHTML = '<li><div class="o-label"><p>标签（多个标签用空格分隔）</p><input type="text" name="label-name" value="" class="lab-ipt"></div></li><li><div class="my-lab mt10 clear"><span>我的标签</span><p class="lab-list">';
            var endHTML = '</p></div></li>';
            var toDoArr = [];

            for(var i = 0;i < data.length;i++){
                toDoArr.push('<span>' + data[i] + '</span>');
            }

            $("." + popContent).append(beginHTML + toDoArr.join("") + endHTML);

            return this;
        }

        this.createCommonLabel = function(data){
            var beginHTML = '<li><div class="my-lab  mt10 clear"><span>常用标签</span><p class="lab-list">';
            var endHTML = '</p></div></li>';
            var toDoArr = [];

            for(var i = 0;i < data.length;i++){
                toDoArr.push('<span>' + data[i] + '</span>');
            }

            $("." + popContent).append(beginHTML + toDoArr.join("") + endHTML);

            this.createLabel = function(){
                var labelName = $("." + wrapClass).find(".o-label .label-name");
                var labelList = $("." + wrapClass).find(".lab-list span");
                var labIpt = $("." + wrapClass).find(".lab-ipt");
                var labelNameArr = [];
                var index = 0;
                labelList.on("click",function(){
                    if($(this).hasClass("mark-on")){
                        index = labelNameArr.indexOf($(this).text());
                        $(this).removeClass("mark-on");
                        console.log(labelNameArr.splice(index,1));
                        labIpt.val(labelNameArr.join(" "));
                    }else{
                        $(this).addClass("mark-on");
                        labelNameArr.push($(this).text());
                        labIpt.val(labelNameArr.join(" "));
                    }
                });

                return this;
            }

            this.createLabel();
            return this;
        }

        this.createDiscus = function(){
            var discus = '<li><p class="clear">简评 <span class="cur-num fr">140</span></p><textarea class="ipt-intro"></textarea></li>';

            $("." + popContent).append(discus);

            this.countWord = function() {
                var shortCommetValue =$(".ipt-intro").val();
                var shortCommetLen = '';
                var maxLen= 140;

                $('.cur-num').text(maxLen);
                $(document).off('input propertychange', '.ipt-intro').on('input propertychange', '.ipt-intro', function() {
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

                $(document).off('keyup', '.ipt-intro').on('keyup', '.ipt-intro', function(e) {
                    if(e.keyCode == 8) {
                        var value = $(this).val();
                        var valLen = value.length;
                        $(".cur-num").text(valLen);
                    }

                });

                return this;
            }

            this.countWord();
            return this;
        }

        this.createShare = function(){
            var share = '<li><span>分享到</span><label class="my-video" for="video"><i class="icon icon-checkbox"></i><input type="checkbox" name="video" id="video"> 我的广播</label><input type="button" class="pop-save" value="保存"></li>';
            $("." + popContent).append(share);

            this.shareEvent = function(){
                $(document).off('click','.my-video').on('click','.my-video', function(e) {
                    e.preventDefault();
                    if($(this).find('i').hasClass('boradCheck')) {
                        $(this).find('i').removeClass('boradCheck');
                    }else {
                        $(this).find('i').addClass('boradCheck');
                    }
                });

                return this;
            }

            this.shareEvent();
            this.save();
            return this;
        }

        this.save = function(){
            $("." + wrapClass).find(".pop-save").on("click",function(){
                $("." + wrapClass).remove();
            });
        }

        this.close = function(){
            $("." + wrapClass).find(".close").on("click",function(){
                $("." + wrapClass).remove();
            });
        }
    }
});