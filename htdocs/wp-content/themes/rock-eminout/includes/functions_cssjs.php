<?php
/********************************************************/
/*
##         ## ##            ##  ######           ######   ######   ######
##         ## ##            ## ##    ##         ##    ## ##    ## ##    ##
##       #########          ## ##               ##       ##       ##
##         ## ##            ##  ######  ####### ##        ######   ######
##       #########    ##    ##       ##         ##             ##       ##
##         ## ##      ##    ## ##    ##         ##    ## ##    ## ##    ##
########   ## ##       ######   ######           ######   ######   ######
*/
//////// CHARGEMENT DES FEUILLES .CSS ET .JS
add_action('wp_enqueue_scripts', YESWEARE=="dev" ? 'ScriptsLocaux' : 'ScriptsProd');

function ScriptsLocaux() {
  // SCRIPTS ET CSS EN DEVELOPPEMENT LOCAL
  // CSS
  wp_enqueue_style('material-design-lite', get_stylesheet_directory_uri().'/css/material-design-lite.css', false, null, 'all');
  wp_enqueue_style('style-style', get_stylesheet_directory_uri().'/style.css', array('material-design-lite'), null, 'all');
  // JS
  wp_enqueue_script('bower', get_stylesheet_directory_uri() . "/dev/tmp/bower_concat_dev.js", false, null, true);
  wp_enqueue_script('angular', get_stylesheet_directory_uri() . "/dev/tmp/annotated.js", false, null, true);
  wp_enqueue_script('scriptsglobaux', get_stylesheet_directory_uri() . "/dev/javascript/script.js", array('bower','angular'), null, true);

}
function ScriptsProd() {
  // SCRIPTS EN PRODUCTION
  // CSS
  wp_enqueue_style('material-design-lite', get_stylesheet_directory_uri().'/css/material-design-lite.css', false, null, 'all');
  wp_enqueue_style('style-child', get_stylesheet_directory_uri() . '/css/style.'.wp_get_theme('rock-eminout')->Version.'.css', false, null, 'all');
  // JS
  wp_enqueue_script('jquery', "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js", false, null, true);
  wp_enqueue_script('angular', "https://ajax.googleapis.com/ajax/libs/angularjs/1.4.2/angular.min.js", false, null, true);
  wp_enqueue_script('scriptsglobaux', get_stylesheet_directory_uri() . "/js/scripts.".wp_get_theme('rock-eminout')->Version.".min.js", array('jquery','angular'), null, true);
}


// Suppression des styles jetpack
// Ci-dessous, deux liens du plugin jetpack que j'ai desactivé.
//wp_enqueue_style('jetpack_css', 'https://www.gilleshoarau.com/wp-content/plugins/jetpack/css/jetpack.css?ver=3.2.1');
//wp_enqueue_script('devicepx', 'https://s0.wp.com/wp-content/js/devicepx-jetpack.js?ver=201447');
add_filter( 'jetpack_implode_frontend_css', '__return_false' );
function removeJetpackStyle() {
  wp_deregister_style('jetpack_css');
}
function removeJetpackScripts() {
  wp_dequeue_script( 'devicepx' );
}
add_action('wp_print_styles', 'removeJetpackStyle',999);
add_action('wp_footer', 'removeJetpackScripts',0);
 ?>
