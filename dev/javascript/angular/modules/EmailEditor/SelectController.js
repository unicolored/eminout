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
            // Use timeout to simulate a 650ms request.
            /*
            return $timeout( function() {
                $scope.users = $scope.users || [
                    {
                        id: 1,
                        name: 'Scooby Doo'
        },
                    {
                        id: 2,
                        name: 'Shaggy Rodgers'
        },
                    {
                        id: 3,
                        name: 'Fred Jones'
        },
                    {
                        id: 4,
                        name: 'Daphne Blake'
        },
                    {
                        id: 5,
                        name: 'Velma Dinkley'
        }
      ];
            }, 650 );
            */
        };
} ] );
