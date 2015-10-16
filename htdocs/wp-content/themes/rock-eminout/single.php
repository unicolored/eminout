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
          <div class="panel-heading">
            <h3 class="panel-title"><span class="label label-default">From :</span>aze</h3>
            <h3 class="panel-title"><span class="label label-default">To :</span>aze</h3>
            <h3 class="panel-title"><span class="label label-default">Sujet :</span>aze</h3>
          </div>
          <div class="panel-body">
            <div class="" id="Preview">
              <em>En attente...</em>
            </div>

          </div>
          <div class="panel-footer">
            <button id="send" class="btn btn-danger"><span class="icon icon-mail"></span> ENVOYER</button>
            <button id="send" class="btn btn-default"><span class="icon icon-mail"></span> TEST</button>
            <div class="pull-right" id="response">
              <em>En attente de l'envoi...</em>
            </div>
          </div>
        </div>
      </div>
      <div class="br_preview">

      </div>
      <hr>
      <div id="myModal" class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel">
        <div class="modal-dialog modal-lg">

          <div class="modal-content">

            <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title">Prévisualisation</h4>
            </div>
            <div class="modal-body">


                <div class="panel panel-default">
                  <div class="panel-heading">
                    <h3 class="panel-title">Le sujet</h3>
                  </div>
                  <div class="panel-body">
                    <div class="" id="preview">
                      <em>En attente...</em>
                    </div>
                    <div class="" id="response">
                      <em>En attente...</em>
                    </div>
                  </div>
                </div>


            </div>
            <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
            <button id="send" class="btn btn-danger"><span class="icon icon-mail"></span> ENVOYER</button>
            </div>




          </div>
        </div>
      </div>

    </section>
    <hr>
    <section class="emailSend">
      <?php get_template_part( 'templates/sendemail'); ?>
    </section>
  </div>

<?php get_footer();?>
