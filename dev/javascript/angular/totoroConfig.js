/*global totoro:false*/
totoro.config( [ 'localStorageServiceProvider', '$locationProvider', function( localStorageServiceProvider, $locationProvider ) {
    'use strict';
    // PARAMETRES DE LOCAL STORAGE
    localStorageServiceProvider.setPrefix( 'totoro' ).setStorageType( 'localStorage' ).setStorageCookie( 1, '/' ).setStorageCookieDomain( 'emailing.fromscratch.xyz' ).setNotify( true, true );
    // EASING PAR DEFAUT pour toutes les animations
    // Note 31/12/14 : pas sûr que cet easing soit bcp utilisé !
    //$.easing.def = 'easeInOutQuart';
    $locationProvider.html5Mode( true ).hashPrefix( '!' );
} ] );
