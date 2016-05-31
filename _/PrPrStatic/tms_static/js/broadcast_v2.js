$(document).ready(function(){ 
    // 发布微博  
    $("#send").click(function(){
    	var content = $("#content").val();
	    $.ajax({
	    	url:"/api/weibo/dosend",
	    	type:"post",
	    	dataType:"json",
	    	data:{ 
	    		content:content,
	    		type:'feed'
	    	},
	    	success:function(data){
	    		if (data.code != 200) {
	    			alert(data.result);
	    		} else {
	    			$("#broad-list").prepend(data.result.weibo_html);
	    			$("#content").val('');
	    		}
	    	},
	    	error:function(){
	    		alert('发布失败');
	    	}
	    });
    });

    // 点击评论两个字
//    $('.docomment').each(function(){
//    	$(this).click(function(){
//    		var weibo_id = $(this).attr('weibo_id');
//        	$("#discuss_" + weibo_id).show();
//        	
//        	// 查询当前微博的所有评论数据
//        	$.ajax({
//    	    	url:"/api/weibo/getcomments",
//    	    	type:"post",
//    	    	dataType:"json",
//    	    	data:{
//    	    		weibo_id:weibo_id
//    	    	},
//    	    	success:function(data){
//    	    		if (data.code != 200) {
//    	    			alert(data.result);
//    	    		} else {
//    	    			$("#discuss-box-"+weibo_id).parent().append(data.result.comment_html);
//    	    		}
//    	    	},
//    	    	error:function(){
//    	    		alert('发布失败');
//    	    	}
//    	    });
//    	});
//    });
    
    $(document).on('click', '.docomment', function(){
    	if ('on' == $(this).attr('is_clicked')){return false;}
    	$(this).attr('is_clicked', 'on');
		var weibo_id = $(this).attr('weibo_id');
    	$("#discuss_" + weibo_id).show();
    	
    	// 查询当前微博的所有评论数据
    	$.ajax({
	    	url:"/api/weibo/getcomments",
	    	type:"post",
	    	dataType:"json",
	    	data:{
	    		weibo_id:weibo_id
	    	},
	    	success:function(data){
	    		if (data.code != 200) {
	    			alert(data.result);
	    		} else {
	    			$("#discuss-box-"+weibo_id).parent().append(data.result.comment_html);
	    		}
	    	},
	    	error:function(){
	    		alert('发布失败');
	    	}
	    });
    });
    
    // 点击发表按钮
//    $('.btn_docomment').each(function(){
//    	$(this).click(function(){
//    		var weibo_id = $(this).attr('weibo_id');
//    		var comment_id = $(this).attr('comment_id');
//    		var comment_content = $("#comment_content_" + weibo_id).val();
//    		
//    		$.ajax({
//    	    	url:"/api/weibo/docomment",
//    	    	type:"post",
//    	    	dataType:"json",
//    	    	data:{
//    	    		content:comment_content,
//    	    		comment_id:comment_id,
//    	    		weibo_id:weibo_id
//    	    	},
//    	    	success:function(data){
//    	    		if (data.code != 200) {
//    	    			alert(data.result);
//    	    		} else {
//    	    			$("#discuss-box-"+weibo_id).parent().append(data.result.comment_html);
//    	    			$("#comment_content_" + weibo_id).val('');
//    	    		}
//    	    	},
//    	    	error:function(){
//    	    		alert('发布失败');
//    	    	}
//    	    });
//    	});
//    });
    $(document).on('click', '.btn_docomment', function(){
		var weibo_id = $(this).attr('weibo_id');
		var comment_id = $(this).attr('comment_id');
		var comment_content = $("#comment_content_" + weibo_id).val();
		
		$.ajax({
	    	url:"/api/weibo/docomment",
	    	type:"post",
	    	dataType:"json",
	    	data:{
	    		content:comment_content,
	    		comment_id:comment_id,
	    		weibo_id:weibo_id
	    	},
	    	success:function(data){
	    		if (data.code != 200) {
	    			alert(data.result);
	    		} else {
	    			$("#discuss-box-"+weibo_id).parent().append(data.result.comment_html);
	    			$("#comment_content_" + weibo_id).val('');
	    		}
	    	},
	    	error:function(){
	    		alert('发布失败');
	    	}
	    });
    });
    
    // 点击回复
    $(document).on('click','.reply',function(){
		var weibo_id = $(this).attr('weibo_id');
		var comment_id = $(this).attr('comment_id');
		var current_username = $(this).attr('username');
		
		// 更改发表节点的属性
		$("#discuss-box-"+weibo_id+" input").attr('weibo_id', weibo_id);
		$("#discuss-box-"+weibo_id+" input").attr('comment_id', comment_id);
		
		// focus到输入内容框
		var pre_content = "回复 @";
		$("#comment_content_" + weibo_id).val(pre_content + current_username + "：");
		$("#comment_content_" + weibo_id).focus();
	});
    
    // 点击赞
    $(document).on('click', '.item-zan', function(){
    	var weibo_id = $(this).attr('weibo_id');
    	$.ajax({
	    	url:"/api/weibo/support",
	    	type:"post",
	    	dataType:"json",
	    	data:{
	    		weibo_id:weibo_id
	    	},
	    	success:function(data){
	    		if (data.code != 200) {
	    			alert(data.result);
	    		} else {
	    			// 修改赞的数目
	    			var old_zan = $("#weibo_"+weibo_id).text();
	    			$("#weibo_"+weibo_id).text(++old_zan);
	    		}
	    	},
	    	error:function(){
	    		alert('发布失败');
	    	}
	    });
    });
});