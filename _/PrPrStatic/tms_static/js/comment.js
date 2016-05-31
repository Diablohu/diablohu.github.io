function callback(){

}

$(document).ready(function(){ 

    // 发布微博  
    $("#send").click(function(){
    	var comment = $("#comment").val();
    	var comment_id = $("#comment_id").val();
    	var data_id = $("#data_id").val();
    	var data_type = $("#data_type").val();
	    $.ajax({
	    	url:"http://login.prpracg.com/api/comment/dosend",
	    	type:"get",
	    	dataType:"jsonp",
	    	jsonp:"callback",
	    	jsonpCallback:"callback",
	    	data:{ 
	    		comment:comment,
	    		comment_id:comment_id,
	    		data_id:data_id,
	    		type:data_type
	    	},
	    	success:function(data){
	    		if (data.code != 200) {
	    			alert(data.result);
	    		} else {
	    			$(".discuss-list").prepend(data.result.comment_html);
	    			$("#content").val('');
	    			$("#comment_id").val('');
	    			var comment_num = parseInt($(".d-num").text())+1;
	    			$(".d-num").text(comment_num);
	    		}
	    	},
	    	error:function(){
	    		alert('发布失败');
	    	}
	    });
    });
   
    // 点击回复
    $(document).on('click','.reply-btn',function(){
		var comment_id = $(this).attr('comment_id');
		var current_username = $(this).attr('username');
		$("#comment_id").val(comment_id);

		// focus到输入内容框
		var pre_content = "回复 @";
		$("#comment").val(pre_content + current_username + "：");
		$("#comment").focus();
	});
    
});