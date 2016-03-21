// Let's start
/*! www.coelis.fr - v0.5.0 - 13-10-2015 [FR] */
//####htdocs/js/contactForm.js
/*global jQuery:false */
/*global $:false */
/*global mandrill:false */
/*global alert:false */
jQuery( document ).ready( function() {
    'use strict';
    var $errormessages = $( '#formerrors' );
    // Chargement du template Mail
    // Au chargement du modal
    /*
  $( '#Preview' ).load( '/assets/templates/generic-mail/_.html', function() {
  $( '.br_artcontent' ).hide();
  $( '#fs_replace' ).html( $( '.br_artcontent' ).html() );
} );
*/
    $( '#Template' ).change( function() {
        var option = $( this ).find( 'option:selected' ).val();
        reloadTemplate( option );
    } );
    $( '[toggle="preview"]' ).on( 'click', function() {
        var modification = $( '.br_artcontent' ).html();
        //alert( listTags );
        jQuery.each( listTags, function() {
            //alert( this );
            //alert( $( 'input[name="' + this + '"]' ).val() );
            modification = modification.replace( '*|' + this + '|*', $( 'input[name="' + this + '"]' ).val() );
        } );
        //modification = modification.replace( '*|DEST_FNAME|*', $( 'input[name="DEST_FNAME"]' ).val() );
        $( '.br_artcontent' ).hide();
        $( '.br_preview' ).hide().html( modification );
        $( '#Preview' ).load( '/assets/templates/generic-mail/_.html', function() {
            //$( '.br_artcontent' ).hide();
            $( '#fs_replace' ).html( $( '.br_preview' ).html() );
        } );
        //$( '#myModal' ).modal( 'show' );
    } );
    /*
    $( '#myModal' ).on( 'show.bs.modal', function() {
    $( '#preview' ).load( '/assets/templates/generic-mail/_.html', function() {
    $( '#fs_replace' ).html( $( '.br_preview' ).html() );
    } );
    } );
    */
    // Validation du formulaire
    $.validate( {
        form: '#contactMandrill',
        validateOnBlur: false,
        errorMessagePosition: $errormessages,
        onSuccess: function() {
            //sendTheMail( params );
            return false; // Will stop the submission of the form
        }
    } );
    //alert('The form '+$form.attr('id')+' is valid!');
    // MANDRILL
    var email = $( 'input#Email' ).val();
    //var textarea = $( 'textarea#Description' ).val().replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /\n/g, '<br/>' );
    //var html = $( '.br_artcontent' ).text().replace( /</g, '&lt;' ).replace( />/g, '&gt;' ).replace( /\n/g, '<br/>' );
    var html = $( '.br_artcontent' ).html();
    var params = {
        'template_name': 'generic-mail',
        'template_content': [
            {
                'name': 'short-preview',
                'content': '<strong><a href="super">Hey</a> <em>Hello you</em></strong>'
    },
            {
                'name': 'body',
                'content': html
    } ],
        'message': {
            'from_email': 'emailing@fromscratch.xyz',
            'from_name': 'Emailing.fs',
            'to': [
                {
                    'email': 'gilles.hoarau@gmail.com',
                    'name': 'Gilles Hoarau',
                    'type': 'to'
    } ],
            'headers': {
                'Reply-To': email
            },
            'tags': [ 'emailing-test' ],
            'google_analytics_domains': [ 'fromscratch.xyz' ],
            'metadata': {
                'website': 'emailing.fromscratch.xyz'
            },
            'important': true,
            'subject': 'Nouveau message test',
            //'html': 'Salut *|COOLFRIEND|*,<br><br>Tu as reçu un nouveau message via <a href="http://www.coelis.fr/?utm_source=mandrill&utm_medium=e-mail&utm_campaign=Lien%20Coelis">Coelis</a>. <br><br><hr> ' + textarea + '<hr><br>Ce visiteur a indiqué l\'adresse mail suivante : <a href="mailto:' + email + '">' + email + '</a>.<br><small>Tu peux soit cliquer sur l\'email ou soit faire <strong>Répondre</strong> à ce mail.</small>',
            //'html': html, --> L'utilisation d'une template exclue l'option html
            'autotext': true,
            'track_opens': false,
            'track_clicks': false,
            'global_merge_vars': [
                {
                    'name': 'EXPE_AUTHORFNAME',
                    'content': 'Gilles'
      } ],
            'merge_vars': [
                {
                    'rcpt': 'gilles.hoarau@gmail.com',
                    'vars': [
                        {
                            'name': 'DEST_FNAME',
                            'content': 'Gillou'
            } ]
          } ]
        }
    };
    $( '#sendMail' ).on( 'click', function() {
        sendTheMail( params );
    } );
    var m = new mandrill.Mandrill( 'iwWz_rBxNDsLU7QI85CxWA' );

    function loadTemplatesList() {
        // Récupère la liste des templates mails
        // TOFIX: Cette fonction devra enregistré les données
        // et il faudra proposer un bouton de rechargement
        m.templates.list( {
            'key': 'iwWz_rBxNDsLU7QI85CxWA'
                //'label': 'Generic'
        }, function( res ) {
            //alert( res[ 0 ].name );
            $.each( res, function( i, value ) {
                $( '#Template' ).append( $( '<option>' ).text( value.name ).attr( 'value', value.slug ) );
            } );
            //console.log( res );
        }, function( err ) {
            alert( err );
        } );
    }
    loadTemplatesList();

    function reloadTemplate( tpl ) {
        // Récupère la liste des templates mails
        // TOFIX: Cette fonction devra enregistré les données
        // et il faudra proposer un bouton de rechargement
        m.templates.info( {
            'key': 'iwWz_rBxNDsLU7QI85CxWA',
            'name': tpl
        }, function( res ) {
            //alert( res[ 0 ].name );
            //$( '.br_artcontent' ).hide();
            var body = $( res.code ).find( '#bodyTable' );
            $( '#Preview' ).html( body );
            //log( res );
        }, function( err ) {
            log( err.name );
        } );
    }
    reloadTemplate( 'Generic Mail' );
    $( '#send' ).on( 'click', function() {} );

    function log( obj ) {
        $( '#response' ).text( JSON.stringify( obj ) );
        //alert( obj[ 0 ]._id );
        return false;
    }

    function sendTheMail( params ) {
        // Send the email!
        //alert( 'bam' );
        //log( m.messages );
        m.messages.sendTemplate( params, function( res ) {
            log( res );
            //console.log( res );
            m.messages.info( {
                'key': 'mWCFt2l4ZLAawWfTITg5Ng',
                'id': res[ 0 ]._id
            } );
        }, function( err ) {
            log( err );
        } );
    }
} );
