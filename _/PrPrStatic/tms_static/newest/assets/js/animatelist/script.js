
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
                    +'<a href="" class="abs img-cont other-imgcont">'
                    +'<img src="'+dataList[i].v_image+'"/>'
                    +'</a>'
                    +'<div class="info-itme other-item">'
                    +'<a href="" class="c-title">'+dataList[i].f_id+'</a>'
                    +'<p>'+dataList[i].f_name+'</p>'
                    +'<div class="r-title">'
                    +'<span>'+dataList[i].v_id+'</span>'
                    +'<a href="">'+dataList[i].v_name_zh+'</a>'
                    +'</div>'
                    +'<div class="r-oprate">'
                    +'<a href="" class="m-button circle-btn">圈子</a>'
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
        sendAjax:function() {

            var self = this;
            var pageSize = 3,
                url="http://anime.prpracg.com/api/anime/other_character";
            var data_id = $("#data_id").val();
            if(self.totalNum!=0 && self.totalNum<self.pageNum) return;
            $.ajax({
                url:url,
                data:{
                    "data_id":data_id,
                    "pageSize":pageSize,
                    "pageNum":self.pageNum
                },
                type:'get',
                dataType: 'text',
                success: function(data){
                    data= JSON.parse(data);
                    if(data && data.result.datas.length!=0){
                        if(self.pageNum > data.result.pageinfo.total_pages) return;
                        self.drawHtml(data);
                        self.totalNum= data.result.pageinfo.total_pages;
                        self.pageNum++;
                        animatList.loading = true;
                    }
                    //else self.drawHtmlNoData();
                },
                error:function(err){
                }
            });
        },
        init: function() {
            var self = this;
            self.sendAjax();
            animatList.loading = false;  //触发开关，防止多次调用事件
            self.timer;
            $(document).on('scroll',function() {
                if(self.timer) clearTimeout(self.timer);
                if(self.buttomdistance(20)) {
                    self.timer= setTimeout(function() {
                        if(animatList.loading) {
                            self.sendAjax();
                        }
                    },150);
                }
            });
        }
    }
    animatList.init();
});