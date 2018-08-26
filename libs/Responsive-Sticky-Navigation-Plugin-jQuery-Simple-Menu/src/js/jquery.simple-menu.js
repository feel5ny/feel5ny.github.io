( function( $ ) {

  'use strict';

  var defaults = {
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


  function SimpleMenu( element, options, Waypoint ) {

    this.config = $.extend( { }, defaults, options );
    this.element = element;
    this.Waypoint = Waypoint;

    this.init( );

  }


  SimpleMenu.prototype.init = function( ) {

    var conf = this.config;
    this.getClasses( );
    this.simpleMenu( );
    this.simpleMenuStyles( );

    conf.stickyMenu && this.stickyMenu( );
    conf.slidingLine && this.slidingLine( );

  };

  SimpleMenu.prototype.tools = {

    getMaxOfArray: function( arr ) {

        return Math.max.apply(null, arr);

    },

    getKeyByValue: function( obj, value ) {

        for ( var prop in obj ) {
            if ( obj.hasOwnProperty( prop ) ) {
                if ( obj[ prop ] === value ) {
                    return prop;
                }
            }
        }

    }

  };


  SimpleMenu.prototype.getClasses = function( ) {

    var conf = this.config;

    function getClass( name ) {
      return '.' + name;
    };

    this.btnClassMenu = getClass( conf.btnClassMenu );
    this.slidingLineClassName = getClass( conf.slidingLineClassName );
    this.slidingLineClassNameActive = getClass( conf.slidingLineClassNameActive );
    this.trackedClassName = getClass( conf.trackedClassName );

  };

  SimpleMenu.prototype.simpleMenuStyles = function( ) {

    var self = this,
      el = this.element,
      _window = $( window );

    el.css({
      'display': 'block',
      'position': 'relative',
      'width': '100%'
    });

    el.find( 'ul a' ).css({
      'cursor': 'pointer',
      'display': 'block',
      'text-decoration': 'none'
    });

    function refreshSimpleMenuStyles( ) {

      if ( _window.width() < self.config.winMobWidth ) {
        el.find( 'ul' ).css({
          'position': 'absolute',
          'width': '100%'
        });
        el.find( 'li' ).css({
          'display': 'block'
        });
        el.find( self.btnClassMenu ).css({
          'display': 'block',
          'text-decoration': 'none'
        });
      } else {
        el.find( 'ul' ).css({
          'width': '100%'
        });
        el.find( 'li' ).css({
          'display': 'inline-block'
        });
        el.find( self.btnClassMenu ).css({
          'display': 'none'
        });
      }

    }

    refreshSimpleMenuStyles( );

    _window.resize( function( ) {

      refreshSimpleMenuStyles( );

    });

  };


  SimpleMenu.prototype.simpleMenu = function( ) {

    var conf = this.config,
        el = this.element,
        _window = $( window ),
        menuUl = el.find( 'ul' ),
        menuLi = el.find( 'li' ),
        btnMenu = el.find( this.btnClassMenu ),
        winMobWidth = conf.winMobWidth,
        top = 0;

    if ( _window.width( ) < winMobWidth ) {
      menuUl.hide( );
    }

    btnMenu.click( function( ) {

      menuUl.slideToggle( conf.menuSpeedAnimate );

    });

    menuLi.on( 'click', 'a', function( e ) {
      e.preventDefault( );

      var id = $( this ).attr( 'href' );
      top = $( id ).offset( ).top - menuLi.outerHeight( true );


      $( 'body, html' ).animate({
        scrollTop: top
      }, conf.pageNavigationSpeedAnimate);

    });

    _window.resize( function( ) {

      if ( _window.width( ) > winMobWidth ) {
        menuUl.removeAttr( 'style' );
      } else {
        menuUl.hide( );
      }

    });

  };


  SimpleMenu.prototype.stickyMenu = function( ) {

    var conf = this.config,
        stickyMenuClassName = conf.stickyMenuClassName,
        el = this.element,
        _window = $( window ),
        menuClone = $( '<div/>' ).insertAfter( el ),
        menuHeight = 0, // height of menu
        menuPosition = 0, // height of menu
        menuClonePosition = 0, // position of  clone menu
        windowPosition = 0; // position of window

    function addStickyStyles( ) {

      el.addClass( stickyMenuClassName );
      el.css({
        'position': 'fixed',
        'top': '0',
        'left': '0',
        'width': '100%'
      });

    }

    function removeStickyStyles( ) {

      el.removeClass( stickyMenuClassName );
      el.css({
        'position': 'relative',
        'top': '',
        'left': '',
        'width': '100%'
      });

    }

    function refresh( ) {

      menuHeight = el.outerHeight( true );
      menuPosition = menuClone.offset().top;

    }

    function refreshClone() {

      menuClonePosition = menuClonePosition === 0 ? menuPosition : menuClone.offset().top;

    }

    refresh( );

    menuClone.css( 'height', menuHeight ).hide( );

    refreshClone( );

    _window.resize( function () {
        refresh();
        refreshClone( );
    } );

    _window.scroll( function( ) {

      windowPosition = _window.scrollTop( );

      if ( windowPosition >= menuClonePosition ) {
        addStickyStyles( );
        menuClone.show( );
      } else {
        removeStickyStyles( );
        menuClone.hide( );
      }

    });

  };

  SimpleMenu.prototype.scrollSpy = function( heightMenu ) {
    var self = this,
        _window = $( window );


    function getCurrentSection( obj, num ) {
        var arr = [ ];
        for ( var key in obj ) {
          if ( obj.hasOwnProperty( key ) ) {
            var item = obj[ key ];
            if ( item <= num ) {
              arr.push( item );
            }
          }
        }

        if ( arr.length === 0 ) {
            return null;
        } else  if ( arr.length === 1 ) {
            return  self.tools.getKeyByValue( obj, arr[ 0 ] );
        }

        return self.tools.getKeyByValue( obj, self.tools.getMaxOfArray( arr ) );
    }

      var jSections = $( self.trackedClassName );
      var sections = { };
      jSections.each( function( index, element ) {
          sections[ element.id ] = element.offsetTop;
      });

      var curId, lastId;

      _window.scroll( function ( ) {

        var scrollPosition = _window.scrollTop( );

        curId = getCurrentSection( sections, scrollPosition + heightMenu );
        if ( curId ) {
            if ( lastId !== curId ) {
                lastId = curId;
                self.changeMenuItem( curId );
            }
        }

      });
  }


  SimpleMenu.prototype.slidingLine = function( ) {

    var self = this,
        conf = this.config,
        el = this.element,
        _window = $( window ),
        line,
        active = conf.slidingLineClassNameActive,
        activeLi,
        menuLi = el.find( 'li' ),
        lineWidth,
        liPos;

    function insertLine( ) {

      if ( el.find( self.slidingLineClassName ).length === 0 ) {
        line = $( '<div class="' + conf.slidingLineClassName + '">' ).appendTo( el );
      }

    }

    function refreshPosition( ) {

      activeLi = el.find( 'li.' + active );
      if ( activeLi.length !== 0 ) {
        lineWidth = activeLi.outerWidth( );
        liPos = activeLi.position( ).left;
      }

    }

    function setLine( ) {

      line.css({
        'position': 'absolute',
        'background-color': conf.slidingLineColor,
        'bottom': '0',
        'height': conf.slidingLineHeight
      }).animate({
        'left': liPos,
        'width': lineWidth
      }, conf.slidingLineSpeedAnimate);

    }

    function checkMob( ) {

      _window.width( ) > conf.winMobWidth ? line.show( ) : line.hide( );

    }

    function moveLine( ) {

      refreshPosition( );
      setLine( );

    }

    function refreshLine( ) {

      insertLine( );
      moveLine( );
      checkMob( );

    }

      self.changeMenuItem = function ( hash ) {
      menuLi.removeClass( active );
      menuLi.each(function( ) {
        if ( $( this ).children( 'a' ).attr( 'href' ).slice( 1 ) === hash ) {
          $( this ).addClass( active );
          moveLine( );
        }

      });
    }

    refreshLine( );

    if ( !$.isEmptyObject( self.Waypoint ) ) {
      var waypointTracked = $( self.trackedClassName );

      waypointTracked.waypoint({
        handler: function( ) {
            self.changeMenuItem( this.element.id );
        },
        offset: '30%'
      });
      waypointTracked.waypoint({
        handler: function( ) {
            self.changeMenuItem( this.element.id );
        },
        offset: -menuLi.outerHeight( true )
      });
    } else {
        self.scrollSpy( menuLi.outerHeight( true ) );
    }

    _window.resize( function( ) {

      refreshLine( );

    });

  };


  $.fn.simpleMenu = function( options ) {

    var first = this.first( );
    options = options || { };
    var Waypoint = window.Waypoint || { };
    new SimpleMenu( first, options, Waypoint );
    return first;

  };

} )( jQuery );
