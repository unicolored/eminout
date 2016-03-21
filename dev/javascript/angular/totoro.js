/*!
totoro */
/*exported totoro, select */
console.info( 'Début du fichier totoro' );
// INTERFACE
var contact = angular.module( 'contact', [] );
var select = angular.module( 'select', [] );
var emailstemplates = angular.module( 'emailstemplates', [] );
/*-------------------------------------*/
// CREATION DE L'APPLICATION "TOTORO" //
var totoro = angular.module( 'totoro', [ 'LocalStorageModule', 'ngMaterial', 'select', 'emailstemplates',
function() {
        'use strict';
        console.info( 'Dernière dépendance chargée par totoro!' );
} ] );
totoro.controller( 'AppCtrl', [ '$scope', '$mdSidenav', '$mdDialog', '$location', '$window', '$http', function( $scope, $mdSidenav, $mdDialog, $location, $window, $http ) {
    'use strict';
    $scope.toggleSidenav = function( menuId ) {
        $mdSidenav( menuId ).toggle();
    };
    $scope.navigateTo = function( to, event ) {
        // TOFIX: $location.path( '/' + to + '.html' ).replace();
        var path = '/' + to;
        //$location.path( path ).replace();
        $window.location.href = path;
        //$mdDialog.show( $mdDialog.alert().title( 'Navigating' ).content( 'Imagine being taken to ' + to ).ariaLabel( 'Navigation demo' ).ok( 'Neat!' ).targetEvent( event ) );
    };
    $scope.reloadJson = function( what, event ) {
        var m = new mandrill.Mandrill( 'iwWz_rBxNDsLU7QI85CxWA' );
        // Récupère la liste des templates mails
        // TOFIX: Cette fonction devra enregistré les données
        // et il faudra proposer un bouton de rechargement
        $scope.msg = 'NON';
        m.templates.list( {
            'key': 'iwWz_rBxNDsLU7QI85CxWA'
                //'label': 'Generic'
        }, function( res ) {
            console.log( res );
            $http.post( '/assets/writeJson.php', {
                data: JSON.stringify( res ),
                file: 'templates'
            } ).then( function( data ) {
                console.log( data );
            }, function( data ) {
                console.log( 'NOPE!' );
            } );
            /*
      jQuery.each( res, function( i, value ) {
      jQuery( '#Template' ).append( jQuery( '<option>' ).text( value.name ).attr( 'value', value.slug ) );
    } );*/
            //console.log( res );
        }, function( err ) {
            alert( err );
        } );
        $mdDialog.show( $mdDialog.alert().title( 'Wait...' ).content( 'Reloading ' + what ).ariaLabel( 'Navigation demo' ).ok( $scope.msg ).targetEvent( event ) );
    };
} ] );
totoro.controller( 'ListCtrl', [ '$scope', '$mdDialog', '$http', function( $scope, $mdDialog, $http ) {
    'use strict';
    // Liste des templates
    $scope.attachments = [
        {
            name: 'Janet Perkins',
            img: 'img/100-0.jpeg',
            newMessage: true
    },
        {
            name: 'Mary Johnson',
            img: 'img/100-1.jpeg',
            newMessage: false
    },
        {
            name: 'Peter Carlsson',
            img: 'img/100-2.jpeg',
            newMessage: false
    }
  ];
    // Liste des templates
    $http.get( '/assets/templates.json' ).success( function( response ) {
        console.log( response[ 0 ] );
        $scope.templates = response;
    } );
    /*
  [
  {
  name: 'Janet Perkins',
  img: 'img/100-0.jpeg',
  newMessage: true
},
{
name: 'Mary Johnson',
img: 'img/100-1.jpeg',
newMessage: false
},
{
name: 'Peter Carlsson',
img: 'img/100-2.jpeg',
newMessage: false
}
];*/
    // Liste des Contacts
    $scope.people = [
        {
            name: 'Janet Perkins',
            img: 'img/100-0.jpeg',
            newMessage: true
  },
        {
            name: 'Mary Johnson',
            img: 'img/100-1.jpeg',
            newMessage: false
  },
        {
            name: 'Peter Carlsson',
            img: 'img/100-2.jpeg',
            newMessage: false
  }
];
    $scope.goToPerson = function( person, event ) {
        $mdDialog.show( $mdDialog.alert().title( 'Navigating' ).content( 'Inspect ' + person ).ariaLabel( 'Person inspect demo' ).ok( 'Neat!' ).targetEvent( event ) );
    };
} ] );
// USEFUL Links :
// http://www.airpair.com/angularjs/posts/top-10-mistakes-angularjs-developers-make#1vBTedekYy673kwm.99
/*
// LocalStorageModule //https://github.com/grevory/angular-local-storage
An AngularJS module that gives you access to the browsers local storage with cookie fallback
*/
/*
// angularFileUpload // https://github.com/nervgh/angular-file-upload
Supports drag-n-drop upload, upload progress, validation filters and a file upload queue. It supports native HTML5 uploads, but degrades to a legacy iframe upload method for older browsers. Works with any server side platform which supports standard HTML form uploads.
When files are selected or dropped into the component, one or more filters are applied. Files which pass all filters are added to the queue. When file is added to the queue, for him is created instance of {FileItem} and uploader options are copied into this object. After, items in the queue (FileItems) are ready for uploading.
*/
