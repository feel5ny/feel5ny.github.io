/*!
JQuery Simple Menu Plugin - 0.6.1
Copyright © 2017 Monastyrev Ivan
Licensed under the MIT license.
https://github.com/ikloster03/jquery-simple-menu/blob/master/LICENSE
*/
;'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

(function () {

    'use strict';

    var defaults = {
        menuSpeedAnimate: 600,
        pageNavigationSpeedAnimate: 1500,
        btnClassMenu: 'btn-menu',
        stickyMenu: false,
        stickyMenuClassName: 'fixed',
        slidingLine: false,
        slidingLineClassName: 'sliding-line',
        slidingLineClassNameActive: 'active',
        slidingLineColor: '#ffffff',
        slidingLineHeight: '3px',
        slidingLineSpeedAnimate: 200,
        winMobWidth: 500,
        trackedClassName: 'tracked'
    };

    var Tools = function () {
        function Tools() {
            _classCallCheck(this, Tools);
        }

        _createClass(Tools, null, [{
            key: 'getMaxOfArray',
            value: function getMaxOfArray(arr) {

                return Math.max.apply(null, arr);
            }
        }, {
            key: 'getKeyByValue',
            value: function getKeyByValue(obj, val) {

                for (var prop in obj) {
                    if (obj.hasOwnProperty(prop)) {
                        if (obj[prop] === val) {
                            return prop;
                        }
                    }
                }
            }
        }]);

        return Tools;
    }();

    var SimpleMenu = function () {
        function SimpleMenu(options) {
            _classCallCheck(this, SimpleMenu);

            options = options || {};
            this._config = Object.assign({}, defaults, options);

            this._prepareClasses();
            this._initSimpleMenu();
            this._prepareSimpleMenuStyles();

            var conf = this._config;
            conf.stickyMenu && this._initStickyMenu();
            conf.slidingLine && this._initSlidingLine();
        }

        _createClass(SimpleMenu, [{
            key: '_prepareClasses',
            value: function _prepareClasses() {
                var self = this;
            }
        }, {
            key: '_prepareSimpleMenuStyles',
            value: function _prepareSimpleMenuStyles() {}
        }, {
            key: '_scrollSpy',
            value: function _scrollSpy() {}
        }, {
            key: '_initSimpleMenu',
            value: function _initSimpleMenu() {}
        }, {
            key: '_initStickyMenu',
            value: function _initStickyMenu() {}
        }, {
            key: '_initSlidingLine',
            value: function _initSlidingLine() {}
        }]);

        return SimpleMenu;
    }();
})();