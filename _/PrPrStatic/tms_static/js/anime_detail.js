$(function() {
 //index剧集超过30集隐藏 
    var totalA = $('.s-num a');
    var totalNum = totalA.length; 
    console.log(typeof totalA);
    console.log(totalNum);
    if(totalNum > 30) {
       totalA.slice(29).addClass('s-num-hide');
        var lastAppendA = '<a href="script:;" class="num-i more-num">...</a>'
        $('.s-num').append(lastAppendA);
    }

    $(document).on('click','.more-num', function() {
        console.log(1);
        $('.s-num').find('a').removeClass('s-num-hide');
        $(this).remove();
    });
});