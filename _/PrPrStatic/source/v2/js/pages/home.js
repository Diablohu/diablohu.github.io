/**
 * 页面 - 首页
 */

/**
 * 热点幻灯片
 */
var pageHomeHot = new Component('.page-home-section[section="hot"]','page-home-section-init',function( el ) {
    let $el = $(el)
        ,$slides = $el.find('.slide')
        ,$controls = $('<div class="controls"/>').appendTo($el)
        ,radios = []
        ,switches = []
    
    $slides.each(function( i, slide ){
        let $slide = $(slide).attr('data-order', i+1)
            ,imgLoading = 0
            ,$imgs = $slide.find('img')
        
        // radio
        radios[i] = $('<input/>',{
            'type':     'radio',
            'name':     `page-home-section-hot-${pageHomeHot.index}`,
            'id':       `page-home-section-hot-${pageHomeHot.index}-${i+1}`,
            'value':    i+1
        }).prop('checked', !i).prependTo($el)
        
        // label
        switches[i] = $('<label/>',{
            'for':      `page-home-section-hot-${pageHomeHot.index}-${i+1}`,
            'data-order':i + 1//,
            //'html':     i+1
        }).appendTo($controls)
        
        // 加入 loading 提示
        let loader = $('<div class="loading vmiddle"><span class="loader-circle vmiddle-body"></span></div>').prependTo( $slide )
        
        // 检查是否有图片
        function imgReady(){
            //console.log('ready')
            loader.remove()
        }
        if( $imgs.length ){
            imgLoading = $imgs.length
            $imgs.each(function( j, img ){
                imgOk( img, function(evt){
                    imgLoading--
                    if( !imgLoading )
                        imgReady()
                } )
            })
        }else{
            imgReady()
        }
    })
    
    pageHomeHot.index++;
    
});
pageHomeHot.index = 0;

/**
 * 什么值得舔
 */
var pageHomeHot = new Component('.page-home-section[section="recommended"]','page-home-section-init',function( el ) {
    let $cover = $(el).find('.cover')
    if( !$cover || !$cover.length )
        return false

    let $img = $cover.find('img')
    if( !$img || !$img.length )
        return false
    
    $cover.css('background-image', `url(${$img.attr('src')})`)
})