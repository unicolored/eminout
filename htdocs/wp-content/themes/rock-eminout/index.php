<?php get_header(); ?>

<?php /* The Loop */
if ( have_posts() ) {
  while ( have_posts() ) {
    the_post();
    global $post;
    if (is_page()) {
      get_template_part( 'templates/page',$post->post_name);
    }
    else {
      get_template_part( 'templates/article');
    }
  }
} else {
  get_template_part( 'templates/_nocontent');
}
?>

<?php get_footer();?>
