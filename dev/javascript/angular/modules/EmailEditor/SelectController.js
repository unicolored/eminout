/*global select:false*/
select.controller( 'SelectAsyncController', [ '$timeout', '$scope', '$http',
function( $timeout, $scope, $http ) {
        'use strict';
        $scope.user = null;
        $scope.users = null;
        /*
        $http.get( '/assets/templates.json' ).success( function( response ) {
            console.log( response[ 0 ] );
            $scope.users = response;
        } );*/
        $scope.loadUsers = function() {
            $http.get( '/assets/templates.json' ).success( function( response ) {
                console.log( response[ 0 ] );
                $scope.users = response;
            } );
        };
        /*
        $scope.loadWpPosts = function() {
            $http.get( '/wp-json/posts?type[]=post' ).success( function( response ) {
                console.log( response[ 0 ] );
                $scope.users = response;
            } );
        };
        */
} ] );
