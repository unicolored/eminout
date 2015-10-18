<?php
global $output_global, $output_dest, $output_expe;
?>

<div class="leFormulaire">

  <md-content class="md-padding">
    <md-tabs md-dynamic-height md-border-bottom>
      <md-tab label="global">
        <md-content class="md-padding">
          <md-subheader class="md-primary">Global <small>*|GLOBAL_...|*</small></md-subheader>
          <?php
          if(count($output_global[0])>0) {
            foreach($output_global[0] as $tag) {
              formGroup(getTag($tag));
            }
          }
          else {
            print '<div class="alert alert-danger"><p><strong>Attention !</strong> Vide</p></div>';
          }
          ?>
        </md-content>
      </md-tab>
      <md-tab label="destinataire">
        <md-content class="md-padding">
          <md-subheader class="md-primary">Destinataire <small>*|DEST_...|*</small></md-subheader>
          <?php
          if(count($output_dest[0])>0) {
            foreach($output_dest[0] as $tag) {
              formGroup(getTag($tag));
            }
          }
          else {
            print '<div class="alert alert-danger"><p><strong>Attention !</strong> Vide</p></div>';
          }
          ?>
        </md-content>
      </md-tab>
      <md-tab label="expéditeur">
        <md-content class="md-padding">
          <md-subheader class="md-primary">Expéditeur <small>*|EXPE_...|*</small></md-subheader>
          <?php
          // TOFIX: $AUTOTAG['expe_authorfname'] = get_the_author_meta('first_name');
          if(count($output_expe[0])>0) {
            foreach($output_expe[0] as $tag) {
              formGroup(getTag($tag));
            }
          }
          else {
            print '<div class="alert alert-danger"><p><strong>Attention !</strong> Vide</p></div>';
          }
          ?>
        </md-content>
      </md-tab>
    </md-tabs>
  </md-content>



</div>


<div class="reponse hidden">
  <h3>Merci !</h3>
  <p>Votre message nous a bien été transmis. Vous recevrez une réponse dans les meilleurs délais.</p>
  <p><a href="/">Retour à l'accueil</a></p>
</div>
</form>

<div id="formerrors">

</div>
