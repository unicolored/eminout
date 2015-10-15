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
      <button class="btn btn-default" data-toggle="modal" data-target="#myModal"><span class="icon icon-eye"></span> Prévisualiser</button>
    </div>
    <hr>

    <!-- Nav tabs -->
      <ul class="nav nav-tabs" role="tablist">
        <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Global</a></li>
        <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Destinataire</a></li>
        <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Expéditeur</a></li>
        <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Paramètres</a></li>
      </ul>

      <!-- Tab panes -->
      <div class="tab-content">
        <div role="tabpanel" class="tab-pane fade in active" id="home">
          <h3>Global <small>*|GLOBAL_...|*</small></h3>
          <?php
          if(count($output_global[0])>0) {
            foreach($output_global[0] as $tag) {
              $cleanTag = str_replace('*','',$tag);
              $cleanTag = str_replace('|','',$cleanTag);
              $name = strtolower($cleanTag);
              $Label = ucfirst($name);
              print '
              <div class="form-group">
              <label for="'.$Label.'">'.$Label.'</label>
              <input class="form-control" id="'.$Label.'" name="'.$name.'" type="text" placeholder="'.$Label.'" data-validation="required" data-validation-error-msg="Champ obligatoire"/>
              </div>
              ';
            }
          }
          else {
            print '<div class="alert alert-danger"><p><strong>Attention !</strong> Vide</p></div>';
          }
          ?>
          <hr>
        </div>

        <div role="tabpanel" class="tab-pane fade " id="profile">
          <h3>Destinataire <small>*|RCPT_...|*</small></h3>
          <?php
          if(count($output_dest[0])>0) {
            foreach($output_dest[0] as $tag) {
              $cleanTag = str_replace('*','',$tag);
              $cleanTag = str_replace('|','',$cleanTag);
              $name = strtolower($cleanTag);
              $Label = ucfirst($name);
              print '
              <div class="form-group">
              <label for="'.$Label.'">'.$Label.'</label>
              <input class="form-control" id="'.$Label.'" name="'.$name.'" type="text" placeholder="'.$Label.'" data-validation="required" data-validation-error-msg="Champ obligatoire"/>
              </div>
              ';
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
          $AUTOTAG['expe_authorfname'] = get_the_author_meta('first_name');
          if(count($output_expe[0])>0) {
            foreach($output_expe[0] as $tag) {
              $autovalue = false;
              $cleanTag = str_replace('*','',$tag);
              $cleanTag = str_replace('|','',$cleanTag);
              $name = strtolower($cleanTag);
              $Label = ucfirst($name);
              if(isset($AUTOTAG[$name])) {
                $autovalue = 'value="'.$AUTOTAG[$name].'"';
              }
              print '
              <div class="form-group">
              <label for="'.$Label.'">'.$Label.'</label>
              <input '.$autovalue.' class="form-control" id="'.$Label.'" name="'.$name.'" type="text" placeholder="'.$Label.'" data-validation="required" data-validation-error-msg="Champ obligatoire"/>
              </div>
              ';
            }
          }
          else {
            print '<div class="alert alert-danger"><p><strong>Attention !</strong> Vide</p></div>';
          }
          ?>
          <hr>
        </div>

        <div role="tabpanel" class="tab-pane fade " id="settings">
          <h3>Paramètres</h3>
          <div class="form-group">
            <label for="Sujet">Sujet</label>
            <input class="form-control" id="Sujet" name="sujet" type="text" placeholder="<?php print get_the_title() ?>" data-validation="required" data-validation-error-msg="Champ obligatoire"/>
          </div>
          <div class="form-group">
            <label for="Template">Template</label>
            <input class="form-control" id="Template" name="template" type="text" placeholder="default" data-validation="required" data-validation-error-msg="Champ obligatoire"/>
          </div>
          <div class="form-group">
            <label for="From">From</label>
            <input class="form-control" id="From" name="from" type="text" placeholder="Email de l'expéditeur" data-validation="email required" data-validation-error-msg="Adresse email invalide"/>
          </div>

          <div class="form-group">
            <label for="Description">Description</label>
            <textarea class="form-control" id="Description" name="Description" placeholder="Votre message"></textarea>
          </div>

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
