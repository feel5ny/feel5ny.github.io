( function(  ) {

    'use strict';

    const defaults = {
        menuSpeedAnimate:             600,
        pageNavigationSpeedAnimate:   1500,
        btnClassMenu:                 'btn-menu',
        stickyMenu:                   false,
        stickyMenuClassName:          'fixed',
        slidingLine:                  false,
        slidingLineClassName:         'sliding-line',
        slidingLineClassNameActive:   'active',
        slidingLineColor:             '#ffffff',
        slidingLineHeight:            '3px',
        slidingLineSpeedAnimate:      200,
        winMobWidth:                  500,
        trackedClassName:             'tracked'
    };

    class Tools {
        static getMaxOfArray( arr ) {

            return Math.max.apply( null, arr );

        }

        static getKeyByValue( obj, val ) {

            for ( let prop in obj ) {
                if ( obj.hasOwnProperty( prop ) ) {
                    if ( obj[ prop ] === val ) {
                        return prop;
                    }
                }
            }

        }
    }

    class SimpleMenu {

        constructor( options ) {
            options = options || { };
            this._config = Object.assign({ }, defaults, options);

            this._prepareClasses( );
            this._initSimpleMenu( );
            this._prepareSimpleMenuStyles( );

            let conf = this._config;
            conf.stickyMenu && this._initStickyMenu( );
            conf.slidingLine && this._initSlidingLine( );

        }

        _prepareClasses( ) {
            let self = this;

        }

        _prepareSimpleMenuStyles( ) {

        }

        _scrollSpy( ) {

        }

        _initSimpleMenu( ) {

        }

        _initStickyMenu( ) {

        }

        _initSlidingLine( ) {

        }
    }




} )( );