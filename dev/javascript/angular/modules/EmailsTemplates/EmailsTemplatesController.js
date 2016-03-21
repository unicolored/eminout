/*global emailstemplates:false*/
emailstemplates.controller( 'EmailsTemplatesCtrl', [ '$scope', '$timeout', '$q', '$log', 'GetSomeData', function( $scope, $timeout, $q, $log, GetSomeData ) {
    'use strict';
    var self = this;
    self.simulateQuery = false;
    self.isDisabled = false;
    /**
     * Build `states` list of key/value pairs
     */
    $scope.fichiers = GetSomeData.get( '', function( result ) {
        console.log( 'loadAll', result.data );
        return result.data;
    } );

    function loadAll( fichiers ) {
        fichiers.map( function( state ) {
            console.log( 'data.map', state );
            var allStates = {
                value: state.title.toLowerCase(),
                display: state.title
            };
            console.log( 'allStates', allStates );
            return allStates;
        } );
    }
    self.states = loadAll( $scope.fichiers );
    console.log( 'self.states', self.states );

    function createFilterFor( query ) {
        console.log( 'createFilterFor', query );
        var lowercaseQuery = angular.lowercase( query );
        return function filterFn( state ) {
            return ( state.value.indexOf( lowercaseQuery ) === 0 );
        };
    }

    function querySearch( query ) {
        console.log( 'querySearch', query );
        var results = query ? self.states.filter( createFilterFor( query ) ) : self.states;
        /*
        if ( self.simulateQuery ) {
            deferred = $q.defer();
            $timeout( function() {
                deferred.resolve( results );
            }, Math.random() * 1000, false );
            return deferred.promise;
        } else {*/
        return results;
        //}
    }

    function searchTextChange( text ) {
        $log.info( 'Text changed to ' + text );
    }

    function selectedItemChange( item ) {
        $log.info( 'Item changed to ' + JSON.stringify( item ) );
    }
    // list of `state` value/display objects
    console.log( self.states );
    self.querySearch = querySearch();
    self.selectedItemChange = selectedItemChange;
    self.searchTextChange = searchTextChange;
    // ******************************
    // Internal methods
    // ******************************
    /**
     * Search for states... use $timeout to simulate
     * remote dataservice call.
     */
} ] );
