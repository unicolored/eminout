/*global totoro:false*/
/*global version:false*/
/*global jQuery:false*/
totoro.run( [ '$rootScope', '$document', '$window', 'localStorageService', function( $rootScope, $document, $window, localStorageService ) {
    'use strict';
    console.log( 'totoroRun' );
    // CHANGEMENT DE LA META TITLE
    // LOCAL STORAGE de la configuration du site
    localStorageService.set( 'windowWidth', $document[ 0 ].body.clientWidth );
    localStorageService.set( 'windowHeight', $window.innerHeight );
    localStorageService.set( 'version', version() );
    localStorageService.set( 'appName', 'GillesHoarau.com' );
    localStorageService.set( 'appLang', 'fr' );
    //localStorageService.set( 'visiteCarousel', 'no' );
    $rootScope.visiteCarousel = localStorageService.get( 'visiteCarousel' );
    var insideHeight = $window.innerHeight - jQuery( '#navbartop' ).height() - 50;
    var articleHeight = jQuery( 'article.article' ).height();
    console.log( insideHeight, 'insideHeight' );
    console.log( articleHeight, 'articleHeight' );
    if ( insideHeight > articleHeight ) {
        console.log( 'redim !' );
        jQuery( '.heightPage' ).height( insideHeight );
        jQuery( '.heightWindow' ).height( insideHeight );
    }
    // REDIMENSIONNEMENT DE LA HAUTEUR DE CERTAINE FENETRE
    // Variables de détection du navigateur
    //var isOpera = !!window.opera || navigator.userAgent.indexOf( ' OPR/' ) >= 0;
    // Opera 8.0+ (UA detection to detect Blink/v8-powered Opera)
    //var isFirefox = typeof InstallTrigger !== 'undefined'; // Firefox 1.0+
    //var isSafari = Object.prototype.toString.call( window.HTMLElement ).indexOf( 'Constructor' ) > 0;
    // At least Safari 3+: "[object HTMLElementConstructor]"
    //var isChrome = !!window.chrome && !isOpera; // Chrome 1+
    var isIE = /*@cc_on!@*/ false || !!document.documentMode; // At least IE6
    if ( isIE === false ) {
        // On ne redimensionne que si ce n'est pas Internet Explorer qui
        // ne supporte pas les flexbox
        jQuery( window ).resize( function() {
            jQuery( '.heightPage' ).animate( {
                'min-height': insideHeight
            }, 1000 );
            jQuery( '.collapse' ).hide().css( 'min-height', 0 );
        } );
        jQuery( '.br_bonjour' ).animate( {
            'min-height': '100%',
            'height': '100%'
        }, 1000 );
    }
    jQuery( 'a[href^="#"]' ).click( function() {
        var theId = jQuery( this ).attr( 'href' );
        jQuery( 'html, body' ).animate( {
            scrollTop: jQuery( theId ).offset().top
        }, 'slow' );
        return false;
    } );
    //skrollr.init();
    function openPortfolioCarousel() {
        var insertCarousel = jQuery( '.insertCarouselPortfolio' );
        if ( insertCarousel ) {
            var divModalportfolio = jQuery( '<div modal-portfolio></div>' );
            insertCarousel.append( divModalportfolio );
        }
    }
    if ( localStorageService.get( 'visiteCarousel' ) !== 'yes' ) {
        openPortfolioCarousel();
    }
    jQuery( '.selectionPortfolio' ).on( 'click', function() {
        //openPortfolioCarousel();
        localStorageService.set( 'visiteCarousel', false );
        console.log( 'yo' );
        //return false;
    } );
    console.log( 'totoroRun-end' );
} ] );
