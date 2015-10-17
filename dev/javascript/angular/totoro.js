/*!
totoro */
/*exported contact */
console.info( 'Début du fichier totoro' );
// INTERFACE
var contact = angular.module( 'contact', [] );
/*-------------------------------------*/
// CREATION DE L'APPLICATION "TOTORO" //
var totoro = angular.module( 'totoro', [ 'LocalStorageModule', 'contact',
    function() {
        'use strict';
        console.info( 'Dernière dépendance chargée par totoro!' );
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
