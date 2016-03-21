<md-toolbar layout="row">
  <div class="md-toolbar-tools">
    <md-button class="md-icon-button" aria-label="Settings" ng-click="toggleSidenav('left')">
      <md-icon aria-label="Menu"><i class="material-icons">menu</i></md-icon>
    </md-button>
    <h2>
      <?php print get_queried_object()->post_title ?>
    </h2>

    <?php
    if(is_page('templates')) {
      ?>
      <span flex></span>
      <md-button class="md-icon-button" aria-label="Settings" ng-click="reloadJson('templates')">
        <md-icon aria-label="Menu"><i class="material-icons">refresh</i></md-icon>
      </md-button>
      <?php
    }
    ?>

  </div>


</md-toolbar>
