
/*完善制作人物js*/
var Global = typeof Global =='undefined' ? {} : Global;
$(function() {
    Global.animateMark= {
        timer:null,
        liIsClick:false,
        addLine:function(formClass) {
            var $form = $(formClass);
            var self = this;
            $(document).on('focus', formClass+' input[type=text]',function(e) {
                $('.b-line').removeClass('b-line');
                $(this).addClass('b-line');

            });
            $(document).on('blur', formClass+' input[type=text]',function(e) {
                var parentIndex = $(this).parents(".other-info").parent().index();
                var index = $(this).parents(".input-wrap").index();
                var inputOn= $(this).attr('data-on');
                console.log(Global.animateMark["c" + parentIndex][index]);
                if($(this).val() != Global.animateMark["c" + parentIndex][index]) {
                    $(this).val('');

                }
            });
        },
        addOtherName:function($tab) {
            $this= $tab;
            var otherClass= $this.prev().find('input').attr('class'),
                placeHold= $this.prev().find('input').attr('placeholder'),
                holdText= '';
            if(placeHold) {
                holdText= placeHold;
            }

            var inputTxt= [];
            inputTxt.push('<div class="input-wrap"><input type="text" placeholder="'+holdText+'" class="'+otherClass+'"/></div>');
            $this.before(inputTxt.join(''));
        },
        createListHtml:function(data,ele) {
            var listHtml='<div  class="add-li-list"><ul>';
            var data= data.info;
            for(var i= 0,len=data.length; i<len; i++) {
                listHtml+='<li>'+data[i]+'</span></li>';
            }
            listHtml+='</ul><a href="http://v.duba.com" target="_blank">无匹配请添加</a></div>';
            $(ele).before(listHtml);
        },
        getDateList: function(opt,ele) {
            var self= this;
            $.ajax({
                url:'/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/perfectmessage/ajax.txt',
                type:'post',
                dataType: 'json',
                data: opt,
                success: function(data){
                    self.createListHtml(data,ele);
                },
                error:function(err){
                }
            });
        },
        bindList:function() {
            $(document).on('click','.add-li-list li',function(e) {
                // $(this).addClass('drop-list-on');
                var val= $(this).text();
                var parentIndex = $(this).parents(".other-info").parent().index();
                var index = $(this).parents(".input-wrap").index();

                $(this).parent().next('input[type="text"]').attr('data-on','on');
                $(this).parent().next('.add-ipt').val(val);
                $(this).parent('.add-li-list').hide();
                Global.animateMark["c" + parentIndex][index] = $(this).parent().next('.add-ipt').val();
            });

        },
        doAll:function() {

            $(document).on('click', function(e) {
                if(e.target.className != 'add-ipt') {
                    $('.add-li-list').hide();
                }
            });
        },
        init: function() {
            var self= this;
            self.doAll();
            $(document).on('keyup','.add-ipt', function() {
                var data = {};
                data.key= $(this).val();
                var $this= $(this);
                if(Global.animateMark.timer) clearTimeout(Global.animateMark.timer);
                Global.animateMark.timer= setTimeout(function(){
                    //if(!($this.prev().hasClass('add-li-list'))) {
                    $('.add-li-list').remove();
                    self.getDateList(data,$this);
                    //}

                },300)
            });
            this.addLine('.make-list');
            self.bindList();
            $(document).on('click','.add-btn', function(e) {
                self.addOtherName($(this));
            });
        }
    };
    Global.sendEnd= {
        getDate: function(wrap,inputClass){
            var dataList= [];
            var cont = $(wrap).find(inputClass);
            cont.each(function(i,ele) {
                if(ele.value !='') {
                    dataList.push(ele.value);
                }
            });
            return dataList.join(' ');
        },
        sendAjax: function(opt) {
            $.ajax({
                url: '/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/perfectmessage/tt.txt',
                dataType: 'json',
                type: 'post',
                data: opt,
                success: function(data) {
                    console.log(data);
                },
                error: function(err) {
                    console.log(err);
                }
            });
        },
        init: function() {
            var self= this;
            var $item = $(".other-info");
            $item.each(function(index,item){
                Global.animateMark["c" + index] = [];
            });
            console.log(Global.animateMark)
            $('.perfact-btn').on('click',function() {
                var opt= {
                    orginName:self.getDate('.item1','.origin-ipt'),
                    otherName:self.getDate('.item2','.people-ipt')
                }
                self.sendAjax(opt);
            });
        }
    }


    Global.animateMark.init();
    Global.sendEnd.init();

});


