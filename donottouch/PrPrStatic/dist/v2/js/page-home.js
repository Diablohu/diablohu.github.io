'use strict';

var pageHomeHot = new Component('.page-home-section[section="hot"]', 'page-home-section-init', function (el) {
    if (typeof pageHomeHot.index == 'undefined') {
        pageHomeHot.index = 0;
    }

    var $el = $(el),
        $slides = $el.find('.slide'),
        $controls = $('<div class="controls"/>').appendTo($el),
        radios = [],
        switches = [],
        cur = 1,
        count = $slides.length,
        timeoutNext = timeoutStart();

    function slideInit(i, slide) {
        var $slide = $(slide).attr('data-order', i + 1),
            imgLoading = 0,
            $imgs = $slide.find('img');

        radios[i] = $('<input/>', {
            'type': 'radio',
            'name': 'page-home-section-hot-' + pageHomeHot.index,
            'id': 'page-home-section-hot-' + pageHomeHot.index + '-' + (i + 1),
            'value': i + 1
        }).prop('checked', !i).prependTo($el);

        switches[i] = $('<label/>', {
            'for': 'page-home-section-hot-' + pageHomeHot.index + '-' + (i + 1),
            'data-order': i + 1 }).appendTo($controls);

        var loader = $('<div class="loading vmiddle"><span class="loader-circle vmiddle-body"></span></div>').prependTo($slide);

        function imgReady() {
            loader.remove();
        }
        if ($imgs.length) {
            imgLoading = $imgs.length;
            $imgs.each(function (j, img) {
                imgOk(img, function (evt) {
                    imgLoading--;
                    if (!imgLoading) imgReady();
                });
            });
        } else {
            imgReady();
        }
    }

    function radioChange(evt) {
        cur = parseInt(evt.currentTarget.getAttribute('value'));
    }

    function goPrev() {
        go(cur - 1);
    }

    function goNext() {
        go(cur + 1);
    }

    function getOrder(order) {
        order = parseInt(order);
        if (order < 1) order = count;
        if (order > count) order = 1;
        if (!order) return !1;
        return order;
    }

    function getOrderNext() {
        return getOrder(cur + 1);
    }

    function go(order) {
        if (typeof order == 'undefined') return;

        order = getOrder(order);

        radios[order - 1].prop('checked', !0).trigger('change');

        timeoutStart();
    }

    function timeoutStart(time) {
        time = time || 5000;
        timeoutClear();
        console.log('timeoutStart');
        $el.attr('pending', getOrderNext());
        return timeoutNext = setTimeout(goNext, 5000);
    }

    function timeoutClear() {
        if (!timeoutNext) return !0;
        console.log('timeoutClear');
        clearTimeout(timeoutNext);
        timeoutNext = null;
        $el.removeAttr('pending');
        return !0;
    }

    $slides.each(slideInit);
    $el.on('change.radioChange', 'input[type="radio"]', radioChange).on('mousemove.radioChange', function () {
        timeoutClear();
    }).hover(function () {
        return timeoutNext = timeoutStart();
    });

    $('<button/>', {
        'type': 'button',
        'class': 'prev'
    }).on('click', goPrev).prependTo($controls);

    $('<button/>', {
        'type': 'button',
        'class': 'next'
    }).on('click', goNext).appendTo($controls);

    pageHomeHot.index++;
});

var pageHomeHot = new Component('.page-home-section[section="recommended"]', 'page-home-section-init', function (el) {
    var $cover = $(el).find('.cover');
    if (!$cover || !$cover.length) return !1;

    var $img = $cover.find('img');
    if (!$img || !$img.length) return !1;

    $cover.css('background-image', 'url(' + $img.attr('src') + ')');
});