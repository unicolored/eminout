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
// PAR DEFAUT css/style.css SONT CHARGES PAR BODYROCK sur toutes les pages
//print YESWEARE;
function wpdocs_dequeue_script() {
 wp_dequeue_script('dsq_count_script');
}
if (!is_single() || !is_page('a-propos')) {
  add_action( 'wp_print_scripts', 'wpdocs_dequeue_script', 100 );
}
add_action('wp_enqueue_scripts', YESWEARE=="dev" ? 'ScriptsLocaux' : 'ScriptsProd');

function ScriptsLocaux() {
  // SCRIPTS ET CSS EN DEVELOPPEMENT LOCAL
  // CSS
  wp_enqueue_style('style-style', get_stylesheet_directory_uri().'/style.css', false, null, 'all');
  wp_enqueue_script('scriptsglobaux', get_stylesheet_directory_uri() . "/scripts.js", false, null, true);

}
function ScriptsProd() {
  // SCRIPTS EN PRODUCTION
  // CSS
  wp_enqueue_style('style-child', get_stylesheet_directory_uri() . '/css/style.'.wp_get_theme('rock-eminout')->Version.'.css', false, null, 'all');
  // JS
  //wp_enqueue_script('myjquery', "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js", false, null, true);
  wp_enqueue_script('scriptsglobaux', get_stylesheet_directory_uri() . "/js/scripts.".wp_get_theme('rock-eminout')->Version.".min.js", false, null, true);
  if ( is_single() ) {
    wp_enqueue_script('disqus', "http://ghcom.disqus.com/count.js", false, null, true);
  }
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
