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
    <md-button class="md-icon-button" aria-label="Favorite" toggle="preview">
      <md-icon><i class="material-icons">refresh</i></md-icon>
    </md-button>
    <md-button id="testMail" class="md-raised md-primary">Tester</md-button>
    <md-button id="sendMail" class="md-raised md-accent"><md-icon><i class="material-icons">send</i></md-icon></md-button>
  </div>
</md-toolbar>

<form id="contactMandrill" class="formulaire" name="insightly_web_to_lead" action="#" method="post">
  <div layout="row" layout-sm="column" layout-padding layout-fill layout-padding layout-wrap>


    <div flex class="emailModele">

      <?php get_template_part( 'templates/panel'); ?>

      <div class="br_preview">

      </div>

      <?php get_template_part( 'templates/sendemail'); ?>
    </div>
    <div flex class="emailSend">
      <md-content class="md-padding">
        <div ng-controller="SelectAsyncController" ng-cloak>
          <md-select placeholder="Template" ng-model="user" md-on-open="loadUsers()">
            <md-option ng-value="user" ng-repeat="user in users">{{user.name}}</md-option>
          </md-select>
        </div>
      </md-content>
      <md-whiteframe class="md-whiteframe-z1" layout="column" layout-margin layout-padding layout-align="center center">


        <hr>
        <div id="Preview">
          <em>En attente...</em>
        </div>
      </md-whiteframe>
    </div>
  </div>
</form>

<?php get_footer();?>
