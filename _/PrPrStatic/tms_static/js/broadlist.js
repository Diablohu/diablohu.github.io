$("document").ready(function(){ 
		$("#like").click(function(){
			$.ajax({
				url:"/api/comment/likeReport", 
				type:"post",
				dataType:"json",
				data:{
					source:$("#source").val(),
					resid:$("#resid").val(),
					op_type:$("#op_type").val()
				},
				success:function(result){
					if(result.code != 0)
					{
						alert(result.data);
					} else {
						alert('获取评论成功');
					}
				},
				error:function(){
					alert('请求失败');
				}
			});
		});
		
		$("#notlike").click(function(){
			
		});
		
		$("#getCommentInfo").click(function(){
			$.ajax({
				url:"/api/comment/getCommContent",
				type:"post",
				dataType:"json",
				data:{
					source:$("#source").val(),
					resid:$("#resid").val(),
					comment_id:$("#comment_id").val()
				},
				success:function(result){
					if(result.code != 0)
					{
						alert(result.data);
					} else {
						alert('获取评论详情成功');
					}
				},
				error:function(){
					alert('请求失败');
				}
			});
		});
		
		$("#delcomment").click(function(){
			$.ajax({
				url:"/api/comment/delComment",
				type:"post",
				dataType:"json",
				data:{
					source:$("#source").val(),
					resid:$("#resid").val(),
					comment_id:$("#comment_id").val()
				},
				success:function(result){
					if(result.code != 0)
					{
						alert(result.data);
					} else {
						alert('删除评论成功');
					}
				},
				error:function(){
					alert('请求失败');
				}
			});
		});
		
		
		$("#getResourceCommentCount").click(function(){
			$.ajax({
				url:"/api/comment/getResourceCommCount",
				type:"post",
				dataType:"json",
				data:{
					source:$("#source").val(),
					resid:$("#resid").val()
				},
				success:function(result){alert(result[1]);
					/*
					 * if(result.code != 0 || ! result.data) {
					 * alert(result.data); } else { alert('获取评论成功'); }
					 */
				},
				error:function(){
					alert('请求失败');
				}
			});
		});
		
		
		// 获取单个资源的评论列表
			$.ajax({
				url:"/api/comment/get",
				type:"post",
				dataType:"json",
				data:{
					source:$("#source").val(),
					resid:$("#resid").val()
				},
				success:function(result){
					if(result.code != 0)
					{
						// alert(result.data);
						alert(result.data);
					} else {
	                     var tmp_str = '';
	                     $.each(result.data, function(key, val) {
                           tmp_str += '<li><a href="" class="abs broad-img"><img src="./assets/img/head-pic.jpg"></a>';  
                           tmp_str += '<div class="broad-info"><h4><a href="">寄生兽粉丝后援团</a>  发布</h4><p>'+val['cn']+'<\/p>';
                           tmp_str += '</p><div class="item-operat mt10"><a class="item-pl mr20" href="javascript:;">评论(<span class="pl-num">'+val['reply_count']+'</span>)</a><a class="item-zan';
                           if(val['have_zan'] == '1') {
                           	   tmp_str += ' item-zan-on" ';="" tmp_str="" +=" op_type="2"" ;="" }="" else="" {="" '+val['cid']+'\')"="" id="zan_'+val['cid']+'"><i class="zan-icon"></i>赞<span class="pl-num">0</span></a></div></div>';
                           tmp_str += '<div class="discuss"><i class="discuss-arrow"></i><div class="discuss-box">';
                           if(typeof(val.reply) !== 'undefined') {
	                           $.each(val.reply, function(k, v) {
	                           		tmp_str += '<p><a href="">用户AAA：</a><span>'+v.cn+'</span><span class="reply" onclick="reply_reply(\'@sdfs\',\''+v.cid+'\',\''+val.cid+'\')">回复</span></p>';
	                           });
	                   	   }
                       	   tmp_str += '<textarea class="reply-box fl" id="reply_box'+val['cid']+'">