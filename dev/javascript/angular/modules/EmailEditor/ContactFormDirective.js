/*global contact:false*/
contact.directive( 'contactform', [ function() {
    'use strict';
    console.log( 'ContactFormDirective' );
    return {
        restrict: 'A',
        templateUrl: '/wp-content/themes/rock-gilleshoarau/js/angular/Contact/_contactform.html'
    };
} ] );
