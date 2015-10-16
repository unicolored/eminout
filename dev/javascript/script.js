// Let's start
/*! www.coelis.fr - v0.5.0 - 13-10-2015 [FR] */
//####htdocs/js/contactForm.js
/*global jQuery:false */
/*global $:false */
/*global mandrill:false */
jQuery( document ).ready( function() {
    'use strict';
    // Chargement du template Mail
    // Au chargement du modal
    $( '#myModal' ).on( 'show.bs.modal', function() {
        $( '#preview' ).load( '/assets/templates/generic-mail/_.html', function() {
            $( '#fs_replace' ).html( $( '.br_artcontent' ).html() );
        } );
    } );
    // Validation du formulaire
    $.validate( {
        form: '#contactMandrill',
        validateOnBlur: true,
        onSuccess: function() {
            //alert('The form '+$form.attr('id')+' is valid!');
            $( '.leFormulaire' ).hide();
            $( '.reponse' ).show();
            $( '.freelances' ).hide();
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
                    'html': html,
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
            sendTheMail( params );
            return false; // Will stop the submission of the form
        }
    } );
    var m = new mandrill.Mandrill( 'iwWz_rBxNDsLU7QI85CxWA' );
    $( '#send' ).on( 'click', function() {} );

    function log( obj ) {
        $( '#response' ).text( JSON.stringify( obj ) );
        alert( obj[ 0 ]._id );
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
