/*增加条目*/
var Global = typeof Global =='undefined' ? {} : Global;
$(function() {
    Global.roleCont= {
        addLine:function(formClass) {
            var $form = $(formClass);
            var self = this;
            $(document).on('focus', 'input[type=text]',function(e) {
                $('.b-line').removeClass('b-line');
                $(this).addClass('b-line');
            });
            $(document).on('blur', 'input[type=text]',function(e) {
                $('.b-line').removeClass('b-line');
                if($(this).hasClass('add-ipt')) {
                    var parentIndex = $(this).closest('tr').index();
                    var index= $(this).parents('.input-wrap').index();

                    if($(this).val() !=Global.roleCont["c"+parentIndex][index]) {
                        $(this).val('');
                    }
                }
                /*验证添加角色原名不能为空*/
                if($(this).hasClass("a-name")){
                    self.roleTest();
                }
            });
        },
        roleTest: function() { //添加角色验证
            var oldName = $('.new-info .a-name').val();
            if (oldName == '') {
                $('.new-info .a-error').html('原名不能为空').show();
                return false
            } else {
                $('.new-info .a-error').hide();
            }
            return true;
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

        delRelative:function($delbtn) {
            var $this= $delbtn;
            $this.closest('tr').remove();
        },

        doAll:function() {

            $(document).on('click', function(e) {
                if(e.target.className != 'add-ipt' || e.target.className != 'p-ipt') {
                    $('.add-li-list').hide();
                }
            });
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
        getDateList: function(url,opt,ele) {
            var self= this;
            $.ajax({
                url:url,
                type:'post',
                dataType: 'text',
                data: opt,
                success: function(data){
                    data= JSON.parse(data);
                    self.createListHtml(data,ele);


                },
                error:function(err){
                }
            });
        },
        createTable:function(result) {
            var tHtml=[];
            tHtml.push('<tr>');
            for(var i=0; i<result.length; i++) {
                tHtml.push('<td><strong>'+result[i].id+'</strong></td>');
                tHtml.push('<td>'+result[i].role+'</td>');
                tHtml.push('<td>'+result[i].oname+'</td>');
                tHtml.push('<td><a href="">'+result[i].zname+'</a><span class="del">删除</span>'+'</td>');
                tHtml.push('<td>'
                +'<div class="add-cont item'+i+' clear">'
                    +'<div class="add-main clear">'
                        +'<div class="input-wrap">'
                            +'<input type="text" name="" placeholder="输入配音" class="add-ipt">'
                        +'</div>'
                        +'<a href="javascript:;" class="add-btn">添加更多配音</a>'
                   +'</div>'
                +'</div></td>');
                tHtml.push('</tr>');
            }

            $('.role-table tbody').append(tHtml.join(''));

        },
        totalTr:function() {
            /*下拉选择的值存入对应的数据里*/
            var $items= $('.role-table tr');
            $items.each(function(index,ele) {
                Global.roleCont["c"+index]= [];
            });
        },
        roleAjax:function(callback) {
            var self= this;
            $.ajax({
                url: '/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/addrole/showtable.json',
                dataType: 'text',
                type: 'post',
                data: '',
                success: function(data) {
                   // data= eval('('+data+')');
                    data = JSON.parse(data);
                    self.createTable(data["tableshow"]);
                    self.totalTr();
                },
                error: function(err) {
                    console.log(err);
                }

            });
        },
        sendAjax:function(url,data,callback) {
            $.ajax({
                /*url: '/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/addrole/ajax.json',*/
                url:url,
                dataType: 'text',
                type: 'post',
                data: data,
                success: function(result) {
                    data = JSON.parse(result);
                    callback&&callback();
                },
                error: function(err) {
                    console.log(err);
                }

            });
        },
        roleBind:function() {
            $(document).on('click','.add-li-list li',function(e) {
                // $(this).addClass('drop-list-on');
                debugger;
                if($(this).closest('.add-cont').length) {
                    var parentIndex = $(this).closest("tr").index();
                    var index = $(this).closest(".input-wrap").index();
                    var val= $(this).text();
                    $(this).parent().parent().next('input[type="text"]').attr('data-on','on');
                    $(this).parent().parent().next('.add-ipt').val(val);
                    $(this).parent().parent('.add-li-list').hide();
                    Global.roleCont["c" + parentIndex][index]= $(this).parent().parent().next().val();
                }
                var val= $(this).text();
                $(this).closest('.add-li-list').next('.cc-ipt').val(val);

            });

        },
        seirilizeIpt:function(wrap,iptClass) {
            var tIpt=[];
            var $lists= $(wrap).find(iptClass);
            $lists.each(function(index,ele) {
               if($(ele).val()!='') {
                   tIpt.push($(ele).val());
               }
            });
            return tIpt.join(',');

        },
        init: function() {
            var self= this;
            this.addLine('.role-list');
            self.doAll();
            self.roleAjax();
            self.roleBind();//选择下拉数据和创建
            $('.role-s-btn').on('click',function() {
                var other = self.WriteOtherName();
                var conf= {
                    oldName:$('.old-name-ipt').val(),
                    chnName:$('.CHN-ipt').val(),
                    otherName: other,
                    job: $('.job-sel').val()

                };

                var canSubmit = self.roleTest();
                if(canSubmit) {
                    self.WriteOtherName();
                    self.sendAjax(conf);
                    console.log('ajax');

                }else {
                    return false;
                }
            });
            /*删除关系条目*/
            $(document).on('click','.del',function() {
                self.delRelative($(this));
            });
            /*添加更多音频*/
            $(document).on('click','.m-main .add-btn',function() {
                self.addOtherName($(this));
            });

            /*完善条目模糊匹配*/
            $(document).on('keyup','.add-ipt', function() {
                var data = {};
                data.key= self.seirilizeIpt('.new-info','.pei-name');
                var $this= $(this);
                if(Global.roleCont.timer) clearTimeout(Global.roleCont.timer);
                Global.roleCont.timer= setTimeout(function(){
                    $('.add-li-list').remove();
                    self.getDateList('/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/perfectmessage/ajax.txt',data,$this);

                },300)
            });
            /*添加角色模糊匹配*/
            $(document).on('keyup','.cc-ipt', function() {
                var data = {};
                data.key= $(this).val();
                var $this= $(this);
                if(Global.roleCont.time) clearTimeout(Global.roleCont.time);
                Global.roleCont.time= setTimeout(function(){
                    $('.add-li-list').remove();
                    self.getDateList('/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/perfectmessage/ajax.txt',data,$this);

                },300)
            });
            /*完善角色模糊匹配*/
            $(document).on('keyup','.pei-name', function() {
                var data = {};
                data.key= $(this).val();
                var $this= $(this);
                if(Global.roleCont.time) clearTimeout(Global.roleCont.time);
                Global.roleCont.time= setTimeout(function(){
                    $this.prev('.add-li-list').remove();
                    self.getDateList('/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/perfectmessage/ajax.txt',data,$this);

                },300)
            });
            /*数据发送*/
            $('.role-add').on('click',function() {
                var opt= {
                    "pei1": self.seirilizeIpt('.item0','.add-ipt'),
                    "pei2": self.seirilizeIpt('.item1','.add-ipt'),
                    "pei3": self.seirilizeIpt('.item2','.add-ipt')

                }
                self.sendAjax('/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/addrole/ajax.json',opt,function() {
                    console.log('完成');
                });
            });

            /*修改角色*/
            $('.update-btn').on('click',function() {
                var opt= {
                    "oName": $('.p-name').val(),
                    "cName": $('.save-list .z-name').val(),
                    "peiyin": self.seirilizeIpt('.new-info','.p-ipt'),
                    "jiaose": $('.role-sel').val()

                }
                self.sendAjax('/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/addrole/ajax2.json',opt,function() {
                   var insertArr= [];
                    var opt= {
                        "oName":"VBBBB",
                        "cName":"vveeeeeeeee",
                        "peiyin":["vv","dd","dd","rrr"],
                        "jiaose":"主角"
                    }

                    insertArr.push('<tr>');
                    insertArr.push('<td><strong>07</strong></td>');
                    insertArr.push('<td>'+opt.jiaose+'</td>');
                    insertArr.push('<td>'+opt.oName+'</td>');
                    insertArr.push('<td><a href="">5555</a><span class="del">删除</span></td>');
                    var pLe= opt.peiyin;
                    var iptHtml="";
                    if(pLe.length>1) {
                        for(var i=0; i<pLe.length;i++) {
                            iptHtml+='<div class="input-wrap"><input type="text" name=""  placeholder="输入配音" disabled="true" value="'+pLe[i]+'"  class="add-ipt gray-color listed-add"></span></div>';
                        }
                    } else {
                        iptHtml+='<div class="input-wrap"><input type="text" name=""  placeholder="输入配音" readonly="true"  value="'+opt.peiyin[0]+'"  class="add-ipt gray-color listed-add"></span></div>';
                    }
                    iptHtml+='<a href="javascript:;" class="add-btn">添加更多配音</a>';

                    insertArr.push('<td><div class="add-cont clear">'+iptHtml+'</div></td>');
                    insertArr.push('</tr>');
                    var insertHtml= insertArr.join('');
                    $('.role-table tbody').append(insertHtml);




                });
            });

            /*添加新角色*/
            $('.new-info-btn').on('click',function(e) {
                var flag= self.roleTest();
                console.log(flag);
                if(flag) {
                    var opt= {
                        "oName": $('.a-name').val(),
                        "cName": $('.z-name').val()
                    }
                    self.sendAjax('/dmbk.cmcm.com/dmbk.cmcm.com/dmbk.cmcm.com/assets/js/addrole/ajax1.json',opt,function() {
                        $('.add-new').hide();
                        $('.add-new-saved').show();
                        $('.save-list .p-name').val('侦探柯南');
                    });

                }

            });



        }
    }
    Global.roleCont.init();

});


