<?php
global $output_global, $output_dest, $output_expe;
?>
<form id="contactMandrill" class="formulaire" name="insightly_web_to_lead" action="#" method="post">
  <div class="leFormulaire">
    <input type="hidden" name="formId" value="xICIRpTz2dGYF03m4RcwFA=="/>
    <input type="hidden" id="insightly_LeadSource" name="LeadSource" value="48609"/>
    <input id="insightly_FirstName" name="FirstName" type="hidden" value="Nouveau"/>
    <input id="insightly_LastName" name="LastName" type="hidden" value="Prospect"/>
    <div class="form-group">
      <span class="btn btn-default" toggle="preview" data-target="#myModal"><span class="icon icon-eye"></span> Prévisualiser</span>
    </div>
    <hr>

    <!-- Nav tabs -->
    <ul class="nav nav-tabs" role="tablist">
      <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Global</a></li>
      <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Destinataire</a></li>
      <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Expéditeur</a></li>
    </ul>

    <!-- Tab panes -->
    <div class="tab-content">
      <div role="tabpanel" class="tab-pane fade in active" id="home">
        <h3>Global <small>*|GLOBAL_...|*</small></h3>
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
        <hr>
      </div>

      <div role="tabpanel" class="tab-pane fade " id="profile">
        <h3>Destinataire <small>*|DEST_...|*</small></h3>
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
        <hr>
      </div>

      <div role="tabpanel" class="tab-pane fade " id="messages">
        <h3>Expéditeur <small>*|EXPE_...|*</small></h3>
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
        <hr>
      </div>
    </div>

  </div>


</div>
<div class="reponse hidden">
  <h3>Merci !</h3>
  <p>Votre message nous a bien été transmis. Vous recevrez une réponse dans les meilleurs délais.</p>
  <p><a href="/">Retour à l'accueil</a></p>
</div>
</form>

<div id="formerrors">

</div>
