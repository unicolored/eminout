/*global emailstemplates:false*/
emailstemplates.factory( 'GetSomeData', [ '$http', function( $http ) {
    'use strict';
    return {
        get: function( params, callback ) {
            //callback( allStates, status );
            //return allStates;
            $http.get( '/wp-json/posts' + params ).
            then( function( data, status ) {
                callback( data );
            }, function( error, status ) {
                //callback( error, status );
            } );
        }
    };
} ] );
