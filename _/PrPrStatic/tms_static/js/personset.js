$(function() {
    /*个人设置相关js*/
    var Personset = {
        selectSex: function() {  
            var check = '.check-radio';
            $(document).on('click', check,function() {
                $(this).addClass('check-bg').siblings().removeClass('check-bg');
            });
        },
        setSubmit: function() {
            var savebtn = '.savebtn';
            var _this = this;
           

        },
        sendAjax: function() {
            $.ajax({
                type: 'post',
                dataType: 'json',
                url: '',
                data: {

                },
                success: function(data) {
                    //
                },
                error: function(data) {

                }

            });
        },
        init: function() {
            this.selectSex();
            this.setSubmit();
        }
    };

    Personset.init();


});
function save_info()
{
    var username= $('#nickname').val();
   var qq= $('#qq').val();
    var uid= $('#uid').val();
   var telephone= $('#telephone').val();
   var gender = $('input[name="gender"]:checked ').val();
   var sid = getCookie('session_aone');
    $.ajax({
        url:'http://login.prpracg.com/api/member/edit_info?sid='+sid,
        'type':'post',
        'dataType':'json',
        'cache':false,
        'data':{
        username:username,
        qq:qq,
        uid:uid,
        telephone:telephone,
        gender :gender ,
        },
        success:function(data){
            if(data.code == 1)
            {
                $('body').append(Global.dialog.getHtml({'iscorrect':true,'title':data.msg}));
            } else {
              	$('body').append(Global.dialog.getHtml({'iscorrect':false,'title':data.msg}));
            }
             setTimeout(function() {
                        $('.dialog').hide();
                    },1000); 
        }
    });
}