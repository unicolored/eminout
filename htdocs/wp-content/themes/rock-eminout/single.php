<?php get_header(); ?>

<md-toolbar class="md-hue-2">
  <div class="md-toolbar-tools">
    <h2>
      <span><?php print get_the_title() ?></span>
    </h2>
    <span flex></span>
    <md-button class="md-icon-button" aria-label="Favorite">
      <md-icon><i class="material-icons">save</i></md-icon>
    </md-button>
    <md-button id="testMail" class="md-raised md-primary">Tester</md-button>
    <md-button id="sendMail" class="md-raised md-accent"><md-icon><i class="material-icons">send</i></md-icon></md-button>
  </div>
</md-toolbar>

<div layout="row" layout-sm="column" layout-padding layout-fill layout-padding layout-wrap>
  <div flex>
    <section class="emailModele">
      <?php /* The Loop */
      if ( have_posts() ) {
        while ( have_posts() ) {
          the_post();
          get_template_part( 'templates/email');
        }
      } else {
        get_template_part( 'templates/_nocontent');
      }
      ?>
      <?php get_template_part( 'templates/panel'); ?>

      <div class="br_preview">

      </div>
    </section>
  </div>
  <div flex>
    <section class="emailSend">
      <?php get_template_part( 'templates/sendemail'); ?>
    </section>
  </div>
</div>

<?php get_footer();?>
