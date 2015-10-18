<?php
// TOFIX: Ici il faut créer un include spécifique à cette template article
// qui est utilisée pour afficher plusieurs articles sur une même page
//require( ABSPATH.'/wp-content/themes/rock-gilleshoarau/includes/wp_single.php');
?>
<article itemscope="" itemtype="https://schema.org/CreativeWork">


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
