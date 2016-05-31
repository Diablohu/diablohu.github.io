new Component('form', 'form-init', function( el ){
    let $el = $(el)
    
    // prpr-autocomplete="tag"
    $el.find('[prpr-autocomplete="tag"]').each(function( index, input ){
        input = $(input)
        let autocomplete = input.data('Autocomplete')
            ,taglist = $el.parent()
            ,taglistInput = $el.find('[name="tags"]')
            ,taglistArray = []
        
        if( !autocomplete )
            autocomplete = new Autocomplete( input )
        
        $el.on('click.deleteTag', '.tag.is-editable s', deleteTag)
        
        taglist.find('.tag[tag-id]').each(function(index, el){
            taglistArray.push( parseInt( el.getAttribute('tag-id') ) )
        })
        updateTaglist()

        //console.log( autocomplete )
        
        autocomplete.callbacks.resultFilter = function( o ){
            return !(taglistArray.indexOf( o.tag_id ) > -1)
        }
        
        autocomplete.callbacks.resultSelect = function(evt){
            let id = parseInt(evt.currentTarget.getAttribute('item-id'))
            
            evt.preventDefault()
            
            // 检查是否存在该结果
            if( taglistArray.indexOf( id ) > -1 )
                return
            
            $('<span/>',{
                'class':    'tag is-editable',
                'html':     evt.currentTarget.innerHTML,
                'tag-id':   id
            }).append(
                $('<s>×</s>')
            ).insertBefore( input )
            
            taglistArray.push( id )

            updateTaglist()
            
            // 清空输入框中内容
            input.val('').focus()
            autocomplete.cur = null
        }
        
        function updateTaglist(){
            let v = taglistArray.join(',')
            taglistInput.val( v )
            //console.log( v )
            return v
        }
        
        function deleteTag( evt ){
            let el = evt.currentTarget.parentNode
                ,id = parseInt(el.getAttribute('tag-id'))
                ,index = taglistArray.indexOf( id )
            
            taglistArray.splice( index, 1)
            el.parentNode.removeChild(el)
            updateTaglist()
        }
    })
})

new Layout(function( /*self*/ ){
    
    $body.on('click.formCancel', 'form [button="cancel"]', function( evt ){
        //if( isIframe && document.referrer && document.referrer != top.location.href ){
        //    top.modal.hide()
        //    evt.preventDefault()
        //}else{
        let el = evt.currentTarget
        if( !(el.tagName == 'A' && el.getAttribute('href') && el.getAttribute('href') != '#' && el.getAttribute('href').substr(0,10) != 'javascript') ){
            history.back()
            evt.preventDefault()
        }
        //}
    })
    
});