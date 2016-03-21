/*global totoro:false*/
/*global version:false*/
/*global jQuery:false*/
totoro.run( [ '$rootScope', '$document', '$window', 'localStorageService', function( $rootScope, $document, $window, localStorageService ) {
    'use strict';
    console.log( 'totoroRun' );
    // CHANGEMENT DE LA META TITLE
    // LOCAL STORAGE de la configuration du site
    /*
    localStorageService.set( 'windowWidth', $document[ 0 ].body.clientWidth );
    localStorageService.set( 'windowHeight', $window.innerHeight );
    localStorageService.set( 'version', version() );
    localStorageService.set( 'appName', 'GillesHoarau.com' );
    localStorageService.set( 'appLang', 'fr' );*/
    console.log( 'totoroRun-end' );
} ] );
