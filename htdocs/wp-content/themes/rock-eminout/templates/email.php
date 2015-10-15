<?php
// TOFIX: Ici il faut créer un include spécifique à cette template article
// qui est utilisée pour afficher plusieurs articles sur une même page
//require( ABSPATH.'/wp-content/themes/rock-gilleshoarau/includes/wp_single.php');
?>
<article itemscope="" itemtype="https://schema.org/CreativeWork">
  <header class="artHeader">
    <div class="br_artheader">
      <div class="head cat-default">
        <h1 itemprop="name"><?php echo get_the_title() ?></h1>
      </div>
    </div>
  </header>
  <footer class="artFooter">
    <div class="br_artfooter">
      <p>
        <a href="<?php print get_author_posts_url(get_the_author_meta('ID')) ?>"><small>Par <?php print get_the_author() ?></small></a>
        <small class="date"><?php echo get_the_date(); ?></small>
      </p>
    </div>
  </footer>
  <hr>

  <?php
  if(has_post_thumbnail()) {
    ?>
    <div class="introduction">
      <div class="galaxie">
        <span class="fullcolumnimg" fullcolumnimg data-height="<?php echo $thumb_src[2] ?>">
          <img itemprop="image" src="<?php echo $thumb_src[0] ?>" alt="<?php echo get_the_title() ?>" class="img-responsive"  />
        </span>
      </div>
    </div>
    <?php
  }
  ?>

  <section class="artContent">
    <div class="br_artcontent">
      <?php the_content(false); ?>
    </div>
  </section>


</article>
