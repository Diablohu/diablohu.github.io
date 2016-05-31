//广播逻辑


var broad = {
	zanMore: function(zanbtn) {
		var zanBtn = zanbtn || '.pub-zan';
		$(document).on('click', zanBtn, function(e) {
			var zan = $('.zan-num');
			var zanNum = parseInt(zan.text());
			//ajax 点赞功能
			zanNum ++ ;
			$(this).addClass('azan');
			zan.text(zanNum);
		});


	},

	init: function() {
		this.zanMore();
	}

};

$(function() {
	broad.init();


});