/*global totoro:false*/
totoro.config( [ 'localStorageServiceProvider', function( localStorageServiceProvider ) {
    'use strict';
    // PARAMETRES DE LOCAL STORAGE
    localStorageServiceProvider.setPrefix( 'totoro' ).setStorageType( 'localStorage' ).setStorageCookie( 1, '/' ).setStorageCookieDomain( 'gilleshoarau.com' ).setNotify( true, true );
    // EASING PAR DEFAUT pour toutes les animations
    // Note 31/12/14 : pas sûr que cet easing soit bcp utilisé !
    //$.easing.def = 'easeInOutQuart';
} ] );
