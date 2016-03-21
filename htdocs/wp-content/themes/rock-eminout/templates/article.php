<?php
// TOFIX: Ici il faut créer un include spécifique à cette template article
// qui est utilisée pour afficher plusieurs articles sur une même page
//require( ABSPATH.'/wp-content/themes/rock-gilleshoarau/includes/wp_single.php');
?>
<md-card>
      <md-card-content>
        <h2 class="md-title"><?php echo get_the_title() ?></h2>
        <p>
          <?php the_content(false); ?>
        </p>
      </md-card-content>
      <div class="md-actions" layout="row" layout-align="end center">
        <?php // print str_replace(get_bloginfo('url').'/','',get_the_permalink()) ?>
        <md-button ng-click="navigateTo('<?php print str_replace(get_bloginfo('url').'/','',get_the_permalink()) ?>', $event)">Lire la suite</md-button>
      </div>
    </md-card>
