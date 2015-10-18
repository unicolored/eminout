
<md-content class="md-padding">
  <md-input-container >
    <md-icon class="email"><i class="material-icons">email</i></md-icon>
    <input ng-model="user.from" name="from" type="email" placeholder="From" required>
  </md-input-container>

  <md-input-container>
    <md-icon class="email"><i class="material-icons">email</i></md-icon>
    <input ng-model="user.to" id="To" name="to" type="email" placeholder="To" required>
  </md-input-container>

  <div ng-controller="SelectAsyncController" ng-cloak>
    <md-select placeholder="Email" ng-model="user" md-on-open="loadUsers()">
      <md-option ng-value="user" ng-repeat="user in users">{{user.name}}</md-option>
    </md-select>
  </div>
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

  <md-input-container >
    <md-icon class="email"><i class="material-icons">subject</i></md-icon>
    <input ng-model="user.sujet" id="To" name="sujet" type="text" placeholder="Sujet" required>
    <div ng-messages="sendMailForm.sujet.$error">
      <div ng-message="required">Champs requis.</div>
    </div>
  </md-input-container>
</md-content>
