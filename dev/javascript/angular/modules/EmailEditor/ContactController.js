/*global jQuery:false*/
/*global contact:false*/
/*global $:false*/
contact.controller( 'ContactController', [ '$scope', '$http',
function( $scope, $http ) {
        'use strict';
        console.log( 'ContactController' );
        jQuery( 'body' ).removeClass( 'page_services page_portfolio page_home' ).addClass( 'page_contact' );
        // Class du ng-view :
        $scope.pageClass = 'page_contact';
        $scope.success = false;
        $scope.error = false;
        $scope.err = false;
        $scope.send = function() {
            angular.element( '#sendmsg' ).prop( 'disabled', true ).html( 'Envoi en cours...' );
            var htmlBody = '<div>Nom : ' + $scope.user.name + '</div>' + '<div>Email : ' + $scope.user.email + '</div>' + '<div>Téléphone : ' + $scope.user.phone + '</div>' + '<div>Message : ' + $scope.user.body + '</div>' + '<div>Date: ' + ( new Date() ).toString() + '</div>';
            var formData = {
                name: $scope.user.name,
                From: 'contact@gilleshoarau.com',
                To: 'Gilles Hoarau <contact@gilleshoarau.com>',
                HtmlBody: htmlBody,
                Subject: 'FORMULAIRE RAPPEL : ' + $scope.user.name + ' ' + $scope.user.email,
                TextBody: 'Nom : ' + $scope.user.name + ' //// Email : ' + $scope.user.email + ' //// Téléphone : ' + $scope.user.phone + ' //// Message : ' + $scope.user.body,
                //item: item,
            };
            var request = $http( {
                method: 'post',
                url: '/wp-content/themes/rock-gilleshoarau/inc/upload.php',
                //data: ,
                data: $.param( formData ),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            } );
            /* Check whether the HTTP Request is successful or not. */
            request.success( function() {
                $scope.success = true;
                $scope.user = {};
                $scope.contactForm.$setPristine();
                angular.element( '#sendmsg' ).prop( 'disabled', false ).html( 'Envoyer <span class="icon-rocket"></span>' );
            } );
            return false;
        };
}
] );
