'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var $document = $(document),
    $body,
    $window,
    $layout,
    $nav,
    $header,
    $headerNav,
    $main,
    $footer,
    documentScrollTop = 0,
    documentScrollLeft = 0;

NodeList.prototype.forEach = Array.prototype.forEach;

function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

var themes = ['red', 'pink', 'purple', 'deeppurple', 'indigo', 'blue', 'lightblue', 'cyan', 'teal', 'green', 'lightgreen', 'lime', 'yellow', 'amber', 'orange', 'deeporange', 'bluegrey'];

$document.ready(function () {
    $body = $('body');
    $window = $(window);
    $layout = $('#layout');
    $nav = $('#nav');
    $header = $('#header');
    $headerNav = $header.find('.header-nav');
    $main = $('#main');
    $footer = $('#footer');

    var windowResizeDevouncingTimeout = void 0;
    $window.on({
        'resize.resizeDebouncing': function resizeResizeDebouncing() {
            clearTimeout(windowResizeDevouncingTimeout);
            windowResizeDevouncingTimeout = setTimeout(function () {
                $window.trigger('resized');
            }, 100);
        }
    });

    var isScrolling = !1;
    function scrollHandlerNew() {
        documentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
        documentScrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
        if (!isScrolling) {
            requestAnimationFrame(scrollY);
        }
        isScrolling = !0;
    }
    function scrollY() {
        $document.trigger('scrolled');
        isScrolling = !1;
    }
    if (window.requestAnimationFrame) {
        $document.on({
            'scroll.scrollDebouncing': scrollHandlerNew
        });
    } else {
        (function () {
            var windowScrollDevouncingTimeout = void 0;
            $document.on({
                'scroll.scrollDebouncing': function scrollScrollDebouncing() {
                    clearTimeout(windowScrollDevouncingTimeout);
                    windowScrollDevouncingTimeout = setTimeout(function () {
                        documentScrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
                        documentScrollLeft = window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
                        $document.trigger('scrolled');
                    }, 100);
                }
            });
        })();
    }

    Layout.initAll();
    Component.initAll($layout);
});

var Layout = function Layout(functionInit) {
    var _this = this;

    _classCallCheck(this, Layout);

    Layout.items.push(this);
    functionInit = functionInit || function () {};
    this.init = function () {
        if (_this.inited) return _this;

        functionInit(_this);
        _this.inited = !0;
    };
};

Layout.items = [];

Layout.initAll = function () {
    Layout.items.forEach(function (item) {
        if (item.init) item.init();
    });
};

var Component = function Component(selector, attrInit, functionInit) {
    _classCallCheck(this, Component);

    Component.items.push(this);
    functionInit = functionInit || function () {};
    this.init = function ($container) {
        $container.find(selector).each(function (index, el) {
            if (!el.getAttribute(attrInit)) {
                functionInit(el);
                el.setAttribute(attrInit, !0);
            }
        });
    };
};

Component.items = [];

Component.initAll = function ($container) {
    Component.items.forEach(function (item) {
        if (item.init) item.init($container);
    });
};


new Layout(function () {

    $body.on('click.externalLinks pointerdown.externalLinks', 'a', function (evt) {
        if (!evt.currentTarget.getAttribute('target')) {
            var href = evt.currentTarget.getAttribute('href');
            if (location.host) {
                if (['/', '#', '?'].indexOf(href.substr(0, 1)) >= 0 && href.substr(0, 2) != '//') {
                    return evt.currentTarget.setAttribute('target', '_self');
                } else if (href.indexOf('//' + location.host) < 0) {
                    return evt.currentTarget.setAttribute('target', '_blank');
                }
            } else {
                if (href.indexOf('://') > -1) {
                    return evt.currentTarget.setAttribute('target', '_blank');
                }
            }
        }
    });
});

function getTheme(el, getFullName) {
    if (!el || typeof el == 'string' || typeof el == 'number' || typeof el == 'boolean') return getTheme($body, el);

    if (el instanceof jQuery) el = el[0];

    var theme = /theme\-([^ ]+)/g.exec(el.className);

    if (theme && theme.length >= 2) {
        theme = theme[1];
        theme = (getFullName ? 'theme-' : '') + theme;
    } else {
        theme = '';
    }

    return theme.trim();
}

function changeTheme(el, theme) {
    if (!el || typeof el == 'string' || typeof el == 'number') return changeTheme($body, el);

    if (el instanceof jQuery) el = el[0];

    var oldTheme = getTheme(el, !0),
        newTheme = theme ? 'theme-' + theme : '';

    if (oldTheme) return el.className = el.className.replace(getTheme(el, !0), newTheme);

    return el.className += ' ' + newTheme;
}


var layoutHeader = new Layout(function (self) {
    self.getHeaderNavOffsetTop = function () {
        self.headerHeight = $header.outerHeight(!0);
        self.headerNavOffsetTop = self.headerHeight - $headerNav.height() - $nav.height();
        headerSticky();
        return self.headerNavOffsetTop;
    };

    setTimeout(function () {
        self.getHeaderNavOffsetTop();
    }, 200);

    function headerSticky() {
        if (!self.headerNavOffsetTop) return;

        if (documentScrollTop >= self.headerNavOffsetTop && !$layout.hasClass('mod-header-sticky')) {
            $layout.addClass('mod-header-sticky');
        } else if (documentScrollTop < self.headerNavOffsetTop && $layout.hasClass('mod-header-sticky')) {
            $layout.removeClass('mod-header-sticky');
        }
    }

    var banner = $header.find('.header-banner-img');
    function headerBannerParallax() {
        if (!banner.length || documentScrollTop > self.headerHeight) return;
        banner.css('transform', 'translate3d(0, ' + documentScrollTop / 3 + 'px, 0)');
    }

    function headerScrollHandler() {
        headerSticky();
        headerBannerParallax();
    }
    $document.on({
        'scrolled.headerSticky': headerScrollHandler
    });
    $window.on({
        'resized.recalculateHeaderSticky': self.getHeaderNavOffsetTop
    });
});
new Component('.sticky', 'sticky-init', function (el) {
    var offsetTop = !1,
        $el = $(el);
    function getOffsetTop() {
        offsetTop = $el.offset().top - $headerNav.height() - $nav.height() - 30;
        scrollHandler();
        return offsetTop;
    }

    setTimeout(function () {
        getOffsetTop();
    }, 200);

    function scrollHandler() {
        if (offsetTop === !1) return;

        if (documentScrollTop >= offsetTop && !el.getAttribute('sticky')) {
            el.setAttribute('sticky', !0);
        } else if (documentScrollTop < offsetTop && el.getAttribute('sticky')) {
            el.removeAttribute('sticky');
        }
    }

    function resizeHandler() {
        el.removeAttribute('sticky');
        getOffsetTop();
    }

    $document.on({
        'scrolled.headerSticky': scrollHandler
    });
    $window.on({
        'resized.recalculateHeaderSticky': resizeHandler
    });
});