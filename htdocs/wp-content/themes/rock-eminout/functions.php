<?php
// Démarrage du chronomètre
$microtime  = explode(' ', microtime());
global $started_at;
$started_at = (float)$microtime[0] + (float)$microtime[1];

// Liste des Options du thème :
//BR_ICON_SET // Id - Sélection du set d'icône parmis Glyphicon, Font-Awesome, Elusive, etc...
//BR_FONTS // String - Fonts chargées Sous la forme TOFIX : ajouter la forme de la chaine de caractere
//BR_COMPILELESS_ON // Boolean - Active la compilation .less en .css (utile si les .less ont été modifiés)
//BR_VIDEO_AUTOPLAY // Boolean - Active l'autoplay des vidéos sur les pages single
//BR_VIDEO_HEIGHT // Int - La hauteur de l'iframe contenant le lecteur vidéo
//BR_NORESPONSIVE // Boolean - Activation du "responsive"
//BR_AUDIO_HEIGHT // Int - La hauteur de l'iframe contenant le lecteur audio
//BR_ALL_BS_JS // Boolean - Chargement des scripts Bootstrap.min.js
//BR_IMAGE_SIZES // String - Tailles des images - sous la forme : nomdelataille,width,height; nomdelataille2,width2,height2; ...
/////////////////////////////////////////////////////

// Définition d'une constante YESWEARE qui indique que le site est en développement
// Je m'en sers pour charger les scripts js originaux et non concaténés ni minifiés
// Après la tâche grunt production(aka release), il faut tester la concaténation des fichiers / sur la branche release
$local_settings = dirname(__FILE__) . '/dev/yesimlocal.php';
if (file_exists($local_settings)) {
  //include $local_settings;
  define("YESWEARE","dev");
}
else define("YESWEARE","");

add_theme_support( 'html5', array( 'search-form' ) );

register_nav_menu('primary','Menu principal');
register_nav_menu('topmenu','Menu top');
register_nav_menu('sommaire','Sommaire Frontpage');
register_nav_menu('portfolio','Portfolio');

require 'includes/functions_emailing.php';
require 'includes/functions_cssjs.php';

function home_excerpt_length($length) {
  return 30;
}
add_filter('excerpt_length', 'home_excerpt_length',999);

function getBodyClass() {
  $bodyClass['parent']  = 'default';
  $bodyClass['child']   = false;
  // FILTRES GERES PAR WORDPRESS
  if(is_front_page()) { // Page d'accueil
    $bodyClass['parent'] = 'frontpage';
  }
  elseif(is_page()) { // Pages
    $page_id = get_queried_object_id();
    $p = get_post($page_id);
    $bodyClass['parent'] = $p->post_name;
  }
  elseif(is_single()) { // Articles
    $bodyClass['parent'] = 'single';
  }
  elseif(is_home()) { // Articles
    $bodyClass['parent'] = 'blog';
  }
  elseif (is_category()) { // Catégories
    $currentCategoryID = get_query_var('cat');
    $currentCategory = get_category($currentCategoryID);
    $currentCategoryParent = $currentCategory->parent;
    ////////////////////////////////////////////////////////////////////////////////
    if ( $currentCategoryParent > 0 ) {
      $parentCatName = get_cat_name(get_ancestors($currentCategoryID,'category')[0]);
      $bodyClass['parent']  = sanitize_title($parentCatName);
      $bodyClass['child']   = 'cat-child-'.$currentCategory->slug;
    }
    else {
      $bodyClass['parent']  = $currentCategory->slug;
    }
  }
  return $bodyClass;
}

// ISCURRENT()
// Retourne une classe `active` pour la page affichée
function isCurrent($page,$subpage=false) {
  $iS = false;
  switch ($page) {
    default:
    if(isset($_GET['open']) && !isset($_GET['o']) && $_GET['open']==$subpage) {
      $iS = true;
    }
    elseif(isset($_GET['open']) && isset($_GET['o']) && $_GET['o']==$subpage) {
      $iS = true;
    }
    elseif(isset($_GET['show']) && $_GET['show']==$subpage) {
      $iS = true;
    }
    elseif(!isset($_GET['open']) && !isset($_GET['o']) && !isset($_GET['show'])) {
      $iS = is_page(get_page_by_path($page)->ID);
    }
    break;
    case 'home':
    $iS = is_front_page();
    break;
    case 'blog':
    $iS = is_home();
    break;
    case 'services':
    $iS = is_page(9);
    break;
    case 'portfolio':
    $iS = is_category(get_term_by('slug', 'portfolio-graphic-web-design-professionnel', 'category')->term_id);
    break;
    case 'bio':
    $iS = is_page('bio');
    break;
    case 'cv':
    $iS = is_page('cv');
    break;
    case 'contact':
    $iS = is_page(2);
    break;
  }
  return $iS === true ? 'active' : 'notactive';
}

function br_editLink($label='Edit',$classes='btn btn-danger btn-sm') {
  if (current_user_can('edit_themes')) {
    print '<a href="'.get_edit_post_link(get_the_ID()).'" class="'.$classes.' br_edit">'.$label.'</a>';
  }
}

// SIDEBAR PAR DEFAUT (pour Woocommerce notamment)



/* FUNCTIONS.PHP - Configuration manuelle du thème */
// Liste des Constantes Bodyrock :
//THEME_PATH' , 'wp-content/themes/bodyrock/' ); // Liens absolus.
//BR_PATH, //ASSETS_PATH, //INC_PATH, //LESS_PATH, //JS_PATH, //BR_CSS_PATH
//TPL_PATH, //TPL_SIDEBAR_PATH, //TPL_BOOTSTRAP_PATH, //TPL_SINGULAR_PATH

// FONCTIONS Actuellement utilisées
/////////////////////////////////////////////////
//
function bitly_url($longUrl = false, $login = "unicolored", $apiKey = "R_8de9dc884a5f6e6ba8831909df65d03c") {
  $longUrl = ($longUrl == false ? get_permalink() : $longUrl);

  if ($longUrl != false) {
    // Meta Shortlink Bitly
    $bitlyurl = false;
    $ch = curl_init('http://api.bitly.com/v3/shorten?login=' . $login . '&apiKey=' . $apiKey . '&longUrl=' . $longUrl);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    $result = curl_exec($ch);
    $R = json_decode($result);
    $bitlyurl = '<link rel="shortlink" href="'.$R->data->url.'" />';
    //echo ;
    return $R->data->url;
  }
}
// Retourne la classe la plus haute dans la hiérarchie
function br_parentCategory($postId,$link=false) {
  $categories = wp_get_post_categories($postId);
  //vardump($categories);
  $categoryName = false;
  $categoryNameTop = false;
  $i = 0;
  foreach ($categories as $category) {
    $cat = get_the_category($category[$i]);
    if($cat[$i]->parent>0) {
      $categoryName = get_cat_name($cat[$i]->parent);
      $categoryId = $cat[$i]->parent;
    }
    else {
      $categoryNameTop = $cat[$i]->name;
      $categoryId = $cat[$i]->term_id;
    }
    $i++;
  }
  if ( $link == false ) {
    print $categoryName !== false ? $categoryName : $categoryNameTop;
  }
  else {
    print '<a href="'.get_category_link($categoryId).'">'.($categoryName !== false ? $categoryName : $categoryNameTop).'</a>';
  }
}

function iconFormat($format) {
  switch($format) {
    default: $format = 'file-text2'; break;
    case 'video': $format = 'play'; break;
    case 'gallery': $format = 'images'; break;
    case 'image': $format = 'image'; break;
    case 'attachment': $format = 'images'; break;
    case 'chat': $format = 'bubbles2'; break;
    case 'status': $format = 'connection'; break;
    case 'quote': $format = 'quotes-left'; break;
    case 'audio': $format = 'music'; break;
    case 'link': $format = 'link'; break;
    case 'aside': $format = 'plus'; break;
  }
  return sprintf('<span class="icon icon-%s"></span>',$format);
}
function colorFormat($format) {
  switch($format) {
    default: $format = 'default'; break;
    case 'video': $format = 'primary'; break;
    case 'gallery': $format = 'cyan'; break;
    case 'image': $format = 'info'; break;
    case 'attachment': $format = 'warning'; break;
    case 'chat': $format = 'success'; break;
    case 'status': $format = 'black'; break;
    case 'quote': $format = 'white'; break;
    case 'audio': $format = 'danger'; break;
    case 'link': $format = 'magenta'; break;
    case 'aside': $format = 'jaune'; break;
  }
  return $format;
}

/*
##         ## ##      ##          ###    ##    ##  ######   ##     ## ########  ######
##         ## ##      ##         ## ##   ###   ## ##    ##  ##     ## ##       ##    ##
##       #########    ##        ##   ##  ####  ## ##        ##     ## ##       ##
##         ## ##      ##       ##     ## ## ## ## ##   #### ##     ## ######    ######
##       #########    ##       ######### ##  #### ##    ##  ##     ## ##             ##
##         ## ##      ##       ##     ## ##   ### ##    ##  ##     ## ##       ##    ##
########   ## ##      ######## ##     ## ##    ##  ######    #######  ########  ######
*/
// LANGUAGE - Charges les fichiers de langue
// Desactivé car défini dans style.css de ce thème (et non utilisé à l'heure actuelle)
// CHANGE LOCAL LANGUAGE
// must be called before load_theme_textdomain()
/*
add_filter( 'locale', 'my_theme_localized' );
function my_theme_localized( $locale )
{
if ( isset( $_GET['l'] ) )
{
return sanitize_key( $_GET['l'] );
}
return $locale;
}
// SET THEME LANGUAGES DIRECTORY
// Theme translations can be filed in the my_theme/languages/ directory
// Wordpress translations can be filed in the wp-content/languages/ directory
//echo get_stylesheet_directory_uri().'/languages';
add_action('after_setup_theme', 'my_theme_setup');
function my_theme_setup(){
load_theme_textdomain( 'gh' );
//my_theme_localized();
}*/
function my_theme_localized( $locale )
{
  if ( isset( $_GET['l'] ) )
  {
    return sanitize_key( $_GET['l'] );
  }
  $locale = str_replace('-','_',substr($_SERVER['HTTP_ACCEPT_LANGUAGE'],0,5));

  return $locale;
}
load_theme_textdomain( 'rock-gilleshoarau', get_stylesheet_directory() . '/languages' );

/********************************************************/

/*
##         ## ##      #### ##     ##    ###     ######   ########  ######
##         ## ##       ##  ###   ###   ## ##   ##    ##  ##       ##    ##
##       #########     ##  #### ####  ##   ##  ##        ##       ##
##         ## ##       ##  ## ### ## ##     ## ##   #### ######    ######
##       #########     ##  ##     ## ######### ##    ##  ##             ##
##         ## ##       ##  ##     ## ##     ## ##    ##  ##       ##    ##
########   ## ##      #### ##     ## ##     ##  ######   ########  ######
*/
//////// AJOUT DE TAILLES POUR LES MEDIAS
// Ces tailles de vignettes sont entrées manuellement
// Ici je n'utilise pas (encore) l'option du thème BR_IMAGE_SIZES
// Medias par défaut : 180x180 crop, 512x512 proportional, 800x800 proportional
add_image_size( 'vignette', 324, 224, true ); // 1.44
add_image_size( 'twitter', 1024, 512, true ); // 2
add_image_size( 'carre', 400, 400, true ); // 2
add_image_size( 'vertical', 533, 800, true ); // 2
//add_image_size( 'hd', 1280, 720, true ); // 1.77
//add_image_size( 'bg', 1366, 768, true ); // 1.77
//add_image_size( 'facebook', 1200, 628, true ); // 1.91
//add_image_size( 'linkedin', 800, 800, true ); // 1
//add_image_size( 'google', 800, 1200, true ); // 0.66
//add_image_size( 'pinterest', 735, 1102, true ); // 0.66
// Filtres qui modifie le nom des images uploadées afin d'enlever les caractères interdits et les accents.
function sanitize_file_uploads( $file ){
  $file['name'] = sanitize_file_name($file['name']);
  $file['name'] = preg_replace("/[^a-zA-Z0-9\.\-]/", "", $file['name']);
  $file['name'] = strtolower($file['name']);
  add_filter('sanitize_file_name', 'remove_accents');

  return $file;
}
add_filter('wp_handle_upload_prefilter', 'sanitize_file_uploads');

/*
##         ## ##      ##        #######   ######   #### ##    ##    ########     ###     ######   ########
##         ## ##      ##       ##     ## ##    ##   ##  ###   ##    ##     ##   ## ##   ##    ##  ##
##       #########    ##       ##     ## ##         ##  ####  ##    ##     ##  ##   ##  ##        ##
##         ## ##      ##       ##     ## ##   ####  ##  ## ## ##    ########  ##     ## ##   #### ######
##       #########    ##       ##     ## ##    ##   ##  ##  ####    ##        ######### ##    ##  ##
##         ## ##      ##       ##     ## ##    ##   ##  ##   ###    ##        ##     ## ##    ##  ##
########   ## ##      ########  #######   ######   #### ##    ##    ##        ##     ##  ######   ########
*/
// CUSTOM LOGIN PAGE
function custom_login_css() {
  wp_enqueue_style('mystyles', '/css/styles-login.css', false, null, 'all');
}
add_action('login_head', 'custom_login_css');


/********************************************************/
/*
##         ## ##       #######  ##     ## ######## ########  ##     ## ########    ##     ## ######## ##     ## ##
##         ## ##      ##     ## ##     ##    ##    ##     ## ##     ##    ##       ##     ##    ##    ###   ### ##
##       #########    ##     ## ##     ##    ##    ##     ## ##     ##    ##       ##     ##    ##    #### #### ##
##         ## ##      ##     ## ##     ##    ##    ########  ##     ##    ##       #########    ##    ## ### ## ##
##       #########    ##     ## ##     ##    ##    ##        ##     ##    ##       ##     ##    ##    ##     ## ##
##         ## ##      ##     ## ##     ##    ##    ##        ##     ##    ##       ##     ##    ##    ##     ## ##
########   ## ##       #######   #######     ##    ##         #######     ##       ##     ##    ##    ##     ## ########
*/
// Démarrage du buffer qui génère la sortie Html
function sanitize_output($buffer) {

  $search = array(
    '/\>[^\S ]+/s',  // strip whitespaces after tags, except space
    '/[^\S ]+\</s',  // strip whitespaces before tags, except space
    '/(\s)+/s'       // shorten multiple whitespace sequences
  );

  $replace = array(
    '>',
    '<',
    '\\1'
  );

  if(YESWEARE!='dev') {
    //$buffer = preg_replace($search, $replace, $buffer);
  }

  return ltrim($buffer);
}

ob_start("sanitize_output");



?>
