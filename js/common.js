/* 
 * The MIT License
 *
 * Copyright 2015 Erich.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

(function (exports) {
    var _ArrayReduce = Array.prototype.reduce,
        _ArrayForEach = Array.prototype.forEach,
        _head, _main, _foot,
        _headMenu, _headExpandMenu, _headSocialMenu,
        _pageManager, _mainPageGallery,
        _setMenuItemPadding = function ( menuElement ) {
            var n = menuElement.childElementCount,
                t = '0 ' + Math.floor((menuElement.clientWidth - _ArrayReduce.call( menuElement.children, function ( sum, elt ) {
                    return sum + elt.offsetWidth
                }, 0 )) / ( n * 2 - 2 ) ) + 'px';
            _ArrayForEach.call( menuElement.children, function ( elt, i ) { elt.style.margin = [(i+1 < n) ? t : '0 0', i ? t : '0 0'].join( ' ' ) } );
            return menuElement
        },
        _init = function () {
            var elt, i, t;
            (_head = document.querySelector( 'body>header' )).appendChild( _headMenu = _createMenu( t = require( 'data/header-menu.json' ) ) );
            _head.appendChild( elt = document.createElement( 'div' ) ).id = 'header-expanded-container';
            elt.appendChild( document.createElement( 'div' ) ).id = 'header-logo';
            elt.appendChild( _headExpandMenu = _createMenu( require( 'data/header-expanded-menu.json' ) ) );
            _head.appendChild( elt = document.createElement( 'div' ) ).id = 'header-subscribe-container';
            elt.appendChild( _headSocialMenu = _createMenu( require( 'data/header-social-menu.json' ) ) );
            elt.appendChild( t = document.createElement( 'input' ) ).type = 'text';
            t.placeholder = 'name';
            elt.appendChild( t = document.createElement( 'input' ) ).type = 'email';
            t.placeholder = 'name@email.com';
            elt.appendChild( document.createElement( 'button' ) ).textContent = 'join';
            
            _main = document.querySelector( 'body>main' );
            _main.appendChild( _mainPageGallery = (_pageManager = new _PageGallery( 'main-page-gallery' )).gallery );
            
            _foot = document.querySelector( 'body>footer' );
            _foot.querySelector( '#footer-toggle-header' ).addEventListener( 'click', function () {
                document.body.classList.toggle( 'expand-header' );
            }, false );
            
            var tempList = ['simple', 'template1', 'template2', 'template3', 'template4'],
                t, k;
            _loadMustache( 'galleryitem' );
            for ( i = 0; i < tempList.length; i++ ) {
                _pageManager.addPage( k = tempList[i%tempList.length], {
                    title: k,
                    message: "this is a message",
                    index: i,
                    "main-box": "main content",
                    "items": [
                        { index: 0, content: "item 1 summary", image: "images/1023747915_2resized_pic.jpg" },
                        { index: 1, content: "item 2 summary", image: "images/1044387878_14resized_pic.jpg" },
                        { index: 2, content: "item 3 summary", image: "images/1060548545_2resized_pic.jpg" },
                        { index: 3, content: "item 4 summary", image: "images/1080666553_7resized_pic.jpg" },
                        { index: 4, content: "item 5 summary", image: "images/1080989085_6resized_pic.jpg" },
                        { index: 5, content: "item 6 summary", image: "images/1105158563_2resized_pic.jpg" },
                        { index: 6, content: "item 7 summary", image: "images/1131345982_2resized_pic.jpg" },
                        { index: 7, content: "item 8 summary", image: "images/1136352807_26resized_pic.jpg" },
                        { index: 8, content: "item 9 summary", image: "images/1140258920_8resized_pic.jpg" },
                        { index: 9, content: "item 10 summary", image: "images/1281076942_7resized_pic.jpg" },
                        { index: 10, content: "item 11 summary", image: "images/1301081094_resized_pic.jpg" },
                        { index: 11, content: "item 12 summary", image: "images/1315851795_4resized_pic.jpg" }
                    ]
                } );
                _foot.appendChild( t = document.createElement( 'button' ) ).textContent = k;
                t.pageIndex = i;
                t.addEventListener( 'click', function () {
                    _pageManager.goPage( this.pageIndex )
                }, false );
            }
            _pageManager.goPage( 0 );
            
            _resize();
            window.addEventListener( 'resize', _resize, false );
            window.addEventListener( 'orientationchange', _resize, false );
        },
        _resize = function () {
            var wide = window.innerWidth,
                high = window.innerHeight,
                hh = _head.offsetHeight,
                cs = window.getComputedStyle( _main ),
                padding = cs.padding.split( ' ' );
            _mainPageGallery.style.width = ( _main.clientWidth - parseFloat(padding[1]) - parseFloat(padding[3]) ) + 'px';
            _mainPageGallery.style.height = ( _main.clientHeight - parseFloat(padding[0]) - parseFloat(padding[2]) ) + 'px';
//            var n = _headMenu.childElementCount,
//                t = '0 ' + Math.floor((_headMenu.clientWidth - _ArrayReduce.call( _headMenu.children, function ( sum, elt ) {
//                    return sum + elt.offsetWidth
//                }, 0 )) / ( n * 2 - 2 ) ) + 'px';
//            _ArrayForEach.call( _headMenu.children, function ( elt, i ) { elt.style.margin = [(i+1 < n) ? t : '0 0', i ? t : '0 0'].join( ' ' ) } );
            _setMenuItemPadding( _headMenu );
//            _main.style.height = (high - hh - _foot.offsetHeight) + 'px';
//            _main.style.top = hh + 'px';
        },
        _createMenu = function ( conf ) {
            var menu, item, icnf, label, title, i, k, t;
            if ( ! conf ) {
                (menu = document.createElement( 'error' )).textContent = 'cannot load menu, no or empty configuration';
                return menu
            }
            (menu = document.createElement( 'menu' )).className = conf.class || '';
            if ( conf.id ) {
                menu.id = conf.id;
            }
            if ( conf.title ) {
                menu.setAttribute( 'title', conf.title );
            }
            if ( conf.icon ) {
                (menu.appendChild( i = document.createElement( 'div' ) )).setAttribute( 'icon', conf.icon );
            }
            if ( conf.label ) {
                (menu.appendChild( label = document.createElement( 'label' ) )).textContent = conf.label;
            }
            if ( (k = conf.action) ) {
                if ( k instanceof Function )
                    menu.addEventListener( 'click', k, false );
                else if ( (t = k.match(/^javascript:/)) )
                    menu.addEventListener( 'click', new Function( 'evt', k.slice( t[0].length ) ), false );
            }
            if ( conf.items ) {
                for (i = 0; i < conf.items.length; i++) {
                    icnf = conf.items[i];
                    (item = document.createElement( 'li' )).className = icnf.class || '';
                    if ( icnf.id ) {
                        item.id = icnf.id;
                    }
                    if ( icnf.title ) {
                        item.setAttribute( 'title', icnf.title );
                    }
                    if ( icnf.label ) {
                        (item.appendChild( label = document.createElement( 'label' ) )).textContent = icnf.label;
                    }
                    if ( (k = icnf.action) ) {
                        if ( k instanceof Function )
                            item.addEventListener( 'click', k, false );
                        else if ( (t = k.match(/^javascript:/)) )
                            item.addEventListener( 'click', new Function( 'evt', k.slice( t[0].length ) ), false );
                    }
                    if ( (k = icnf.menu) ) {
                        item.appendChild( _createMenu( k ) );
                    }
                    menu.appendChild( item )
                }
            }
            return menu
        },
        _fnCache = {},
        _require = function ( file ) {
            var module = { exports: {} },
                xhr, exp, f, t;
            if ( ! (exp = _fnCache[file]) ) {
                (xhr = new XMLHttpRequest).open('get', f = (_require.prefix || '') + file, false);
                xhr.send(null);
                if ( xhr.status !== 200 || ! (t = xhr.responseText) ) {
                    console.error( xhr );
                    return new Error( f + ' ' + xhr.statusText );
                }
                try {
                    switch ( xhr.getResponseHeader( 'Content-Type' ) ) {
                        case 'application/javascript':
                            module = { exports: {} };
                            exp = (new Function( 'module', ['var exports = module.exports;', t, '; return module.exports'].join('') ))( module );
                            break;
                        case 'application/json':
                            exp = JSON.parse( t );
                            break;
                        default:
                            exp = t;
                            break;
                    }
                } catch ( t ) {
                    console.error( t );
                    return t
                }
                _fnCache[file] = exp;
                xhr = null
            }
            return exp
        },
        _PageGallery = function ( id ) {
            var pageList = [],
                gallery, strip,
                t;
            if ( ! ( this instanceof _PageGallery ) )
                debugger;
            strip = (gallery = document.createElement( 'div' )).appendChild( document.createElement( 'strip' ) ),
            gallery.className = 'page-gallery';
            if ( id )
                gallery.id = id;
            
            Object.defineProperties( this, {
                gallery: { value: gallery },
                strip: { value: strip },
                addPage: { value: function ( template, view ) {
                    var page, content, i;
                    if ( arguments.length > 1 ) {
                        _populate( content = document.createElement( 'page' ), template, view )
                    } else if ( template instanceof Node ) {
                        content = template
                    } else {
                        ( content = document.createElement( 'div' ) ).textContent = template
                    }
                    this.goPage( i = pageList.push( page = _addPage( strip, content ) ) - 1 );
                    return i
                } },
                getPage: { value: function ( i ) { return pageList[i] } },
                goPage: { value: function ( i ) {
                    strip.style.left = (i * -100) + '%';
                    return this
                } },
                removePage: { value: function ( i ) {
                    var page = pageList[i];
                    if ( page ) {
                        page.parentElement.removeChild( page );
                        pageList.splice( i, 1 );
                    }
                    return page
                } }
            } );
        },
        _addPage = function ( pageGallery, page ) {
            var pageContainer = document.createElement( 'page' );
            pageContainer.appendChild( page );
            pageGallery.appendChild( page );
            return pageContainer
        },
        _mustachePrefix = './mustache/',
        _mustacheSuffix = '.mustache',
        _mustacheCache = {},
        _loadMustache = function ( templateName ) {
            var templatePath = [_mustachePrefix, templateName, _mustacheSuffix].join(''),
                template = _mustacheCache[templateName] || (_mustacheCache[templateName] = require( templatePath ));
            if ( ! template ) {
                throw new Error( templatePath + ' not found' );
            }
            return template
        },
        _populate = function ( containerElement, templateName, view ) {
            return containerElement.innerHTML = Mustache.render( _loadMustache( templateName ), view, _mustacheCache );
        },
        t, e;
    
    Object.defineProperties( exports.Resize = _resize, {
        init: { value: _init }
    } );
    
    Object.defineProperties( exports.require = function ( file ) {
        var exp = _require( file );
        if ( exp instanceof Error ) {
            console.log( exp );
            exp = _require( file + '.js' );
            if ( exp instanceof Error ) {
                console.log( exp );
                exp = _require( file + '.json' );
                if ( exp instanceof Error ) {
                    console.log( exp );
                    return;
                }
            }
        }
        return exp
    }, {
        cache: { value: _fnCache } 
    } )
    exports.require.prefix = 'http://localhost/~eda/';

})(window)
