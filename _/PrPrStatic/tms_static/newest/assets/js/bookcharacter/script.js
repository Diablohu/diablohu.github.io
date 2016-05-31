$(function(){

    var animatList= {
        pageNum:1,
        totalNum:0,
        drawHtml:function(result) {
            if(result.code ==200) {
                var dataList= result.result.datas;
                var dataLen= dataList.length;
                var liArr=[];
                for(var i=0;i<dataLen;i++) {
                    liArr.push('<li>'
                    +'<a target="_blank" href="http://character.prpracg.com/detail.html?id='+dataList[i].v_id+'" class="abs img-cont other-imgcont">'
                    +'<img src="'+dataList[i].v_image+'"/>'
                    +'</a>'
                    +'<div class="info-itme other-item">'
                    +'<a target="_blank" href="http://character.prpracg.com/detail.html?id='+dataList[i].v_id+'" class="c-title">'+dataList[i].v_name_zh+'</a>'
                    +'<p>'+dataList[i].v_name+'</p>'
                    +'<div class="r-title">'
                    +'<span></span>'
                    +'<a target="_blank" href="http://celebrity.prpracg.com/detail.html?id='+dataList[i].f_id+'">'+dataList[i].f_name+'</a>'
                    +'</div>'
                    +'<div class="r-oprate">'
                    //+'<a href="" class="m-button circle-btn">圈子</a>'
                    +'</div>'
                    +'</div>'
                    +'</li>');
                }
                var liHtml= liArr.join('');
                $('.otherst-list').append(liHtml);
            }
        },
        buttomdistance:function (len) {
            var docHei=$(document).height(),
                browseHeight=$(window).height(),
                scrollT= $(document).scrollTop();
            // console.log(docHei,browseHeight,scrollT);
            return  docHei-browseHeight-scrollT < len;
        },
        sendAjax:function(page) {
            var self=this;
            var pageSize=3,
                url="http://book.prpracg.com/api/book/other_character";
            var data_id = $("#data_id").val();
            if(self.totalNum!=0&&self.totalNum<page) return;
            $.ajax({
                url:url,
                data:{
                    "data_id":data_id,
                    "pageSize":pageSize,
                    "pageNum":page
                },
                type:'get',
                dataType: 'text',
                success: function(data){
                    data= JSON.parse(data);
                    if(data && data.result.datas.length!=0){
                        if(self.pageNum > data.result.pageinfo.total_pages) return;
                        self.drawHtml(data);
                        self.totalNum= data.result.pageinfo.total_pages;
                        self.canloading = true;
                    }
                    
                    //else self.drawHtmlNoData();
                },
                error:function(err){
                }
            });
        },
        init:function() {
            var self = this;
            self.canloading = false;//触发开关，防止多次调用事件
            self.timer;
            self.sendAjax(1);
            $(document).on('scroll',function() {
                if (self.timer) clearTimeout(self.timer)
                if(self.buttomdistance(20) && self.canloading) {
                    self.timer = setTimeout(function() {
                        self.pageNum++;
                        self.sendAjax(self.pageNum);
                    },200)
                }
            });
        }
    }
    animatList.init();
});