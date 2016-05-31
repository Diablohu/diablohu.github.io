function callback(){

}
var Global = typeof Global =='undefined' ? {} : Global;
$(document).ready(function(){ 

    // 发布评价
    $("#send").click(function(){
    	var content = $("#content").val();
    	var is_see = $("#is_see").val();
    	var data_id = $("#data_id").val();
    	var score = $("#score").val();
    	var data_type = $("#data_type").val();
	    $.ajax({
	    	url:"http://login.prpracg.com/api/evaluation/dosend",
	    	type:"get",
	    	dataType:"jsonp",
	    	jsonp:"callback",
	    	jsonpCallback:"callback",
	    	data:{ 
	    		content:content,
	    		is_see:is_see,
	    		data_id:data_id,
	    		score:score,
	    		type:data_type
	    	},
	    	success:function(data){
	    		if(data.code == 200)
	            {
	                $('body').append(Global.dialog.getHtml({'iscorrect':true,'title':data.result}));
	            } else {
	              	$('body').append(Global.dialog.getHtml({'iscorrect':false,'title':data.result}));
	            }
	             setTimeout(function() {
	                        $('.dialog').hide();
	                    },1000); 
	    	},
	    	error:function(){
	    		//alert('发布失败');
	    	}
	    });
    });

    // 调用评价数据
    get_evaluation(0,1);
    get_evaluation(2,1);
    get_evaluation(3,1);

	function get_evaluation(sort,page) {
		var data_id = $("#data_id").val();
		var data_type = $("#data_type").val();
	    $.ajax({
	    	url:"http://login.prpracg.com/api/evaluation/loadEvaluation",
	    	type:"get",
	    	dataType:"jsonp",
	    	jsonp:"callback",
	    	jsonpCallback:"callback" +sort,
	    	data:{ 
	    		sort:sort,
	    		data_id:data_id,
	    		page:page,
	    		type:data_type
	    	},
	    	success:function(data){
	    		if (data.code != 200) {
	    			alert(data.result);
	    		} else {
	    			var tmp_str = '';
	    			if(data.result.datas) {
		    			$.each(data.result.datas, function(i, item){ 
		    			   if(item.content) {   
						  	 tmp_str += '<li><a href="http://login.prpracg.com/member/index?u='+item.uid+'">';
	                         tmp_str += '<img src="'+item.face+'"/></a><div class="d-box-item"><div class="d-item">';
	                         tmp_str += '<h5>'+item.username+'<em>'+item.time+'</em></h5><p>'+item.content+'</p></div>';
	                         tmp_str += '<span class="f-num">'+item.score+'</span></div></li>';  
	                       }
						});
						data.result.pageinfo.remain_items = data.result.pageinfo.remain_items?data.result.pageinfo.remain_items:0;
						switch (sort) {
							case 2:
								$(".cont-praise ul").append(tmp_str);
								$("#cont-praise").text("好评 ("+data.result.pageinfo.total_items+")");
								$("#cont-praise-more").text("更多评价 ("+data.result.pageinfo.remain_items+")");
								$("#cont-praise-more").attr('page',data.result.pageinfo.current_page+1);
							break;
							case 3:
								$(".cont-bad ul").append(tmp_str);
								$("#cont-bad").text("差评 ("+data.result.pageinfo.total_items+")");
								$("#cont-bad-more").text("更多评价 ("+data.result.pageinfo.remain_items+")");
								$("#cont-bad-more").attr('page',data.result.pageinfo.current_page+1);
							break;
							default:
								$(".cont-new ul").append(tmp_str);
								$("#cont-new-more").text("更多评价 ("+data.result.pageinfo.remain_items+")");
								$("#cont-new-more").attr('page',data.result.pageinfo.current_page+1);
							break; 
						}
					}
	    		}
	    	},
	    	error:function(){
	    		//alert('获取数据失败');
	    	}
	    });
	}

	$(document).on('click','.eva_more',function(){
		var sort = $(this).attr('sort');
		var page = $(this).attr('page');
		get_evaluation(sort,page);
	});
	// 删除数据
	$(document).on('click','.delete-btn',function(){
		var e_id = $(this).attr('e_id');
		if(e_id>0) {
			$.ajax({
		    	url:"http://login.prpracg.com/api/evaluation/delete",
		    	type:"get",
		    	dataType:"jsonp",
		    	jsonp:"callback",
		    	jsonpCallback:"callback",
		    	data:{ 
		    		id:e_id,
		    	},
		    	success:function(data){
		    		if (data.code != 200) {
		    			alert(data.result);
		    		} else {
		    			alert(data.result);
		    			$(this).parent().parent().hide();
		    		}
		    	},
		    	error:function(){
		    		alert('发布失败');
		    	}
	     	});
		}
	});
    
});