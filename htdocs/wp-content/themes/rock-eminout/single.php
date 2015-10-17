<?php get_header(); ?>

<div class="row">

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
    <div id="Panel">
      <div class="panel panel-default">
        <div class="panel-heading form-horizontal">
          <div class="form-group">
            <label for="Template" class="control-label col-sm-2">Template</label>
            <div class="col-sm-10">
              <select class="form-control" id="Template" name="template">
                <option value="none" selected="">Aucune</option>
              </select>
            </div>
          </div>
          <div class="form-group">
            <label for="Template" class="control-label col-sm-2">From</label>
            <div class="col-sm-10">
              <input value="" class="form-control" id="From" name="from" type="email" placeholder="Email de l'expéditeur" data-validation="email required" data-validation-error-msg="Adresse email invalide">
            </div>
          </div>
          <div class="form-group">
            <label for="To" class="control-label col-sm-2">To</label>
            <div class="col-sm-10">
              <input value="" class="form-control" id="To" name="to" type="email" placeholder="Email du destinataire" data-validation="email required" data-validation-error-msg="Adresse email invalide">
            </div>
          </div>
          <div class="form-group">
            <label for="Sujet" class="control-label col-sm-2">Sujet</label>
            <div class="col-sm-10">
              <input value="<?php print get_the_title() ?>" class="form-control" id="Sujet" name="sujet" type="text" placeholder="<?php print get_the_title() ?>" data-validation="required" data-validation-error-msg="Sujet manquant">
            </div>
          </div>
        </div>
        <div class="panel-body">
          <div class="" id="Preview">
            <em>En attente...</em>
          </div>

        </div>
        <div class="panel-footer">
          <button id="sendMail" class="btn btn-danger"><span class="icon icon-mail"></span> ENVOYER</button>
          <button id="testMail" class="btn btn-default"><span class="icon icon-mail"></span> TEST</button>
          <div class="pull-right" id="response">
            <em>En attente de l'envoi...</em>
          </div>
        </div>
      </div>
    </div>
    <div class="br_preview">

    </div>

    <section class="commentaires">
      <div class="br_section ">
        <div class="well">
          <?php comments_template(); ?>
        </div>
      </div>
    </section>
  </section>
  <section class="emailSend">
    <?php get_template_part( 'templates/sendemail'); ?>
  </section>

</div>

<?php get_footer();?>
