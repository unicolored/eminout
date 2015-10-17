<div id="Panel">
  <div class="panel panel-default">
    <div class="panel-heading form-horizontal">
      <div ng-controller="SelectAsyncController" ng-cloak>
        <md-select placeholder="Template" ng-model="user" md-on-open="loadUsers()">
          <md-option ng-value="user" ng-repeat="user in users">{{user.name}}</md-option>
        </md-select>
      </div>

      <md-input-container >
        <md-icon class="email"><i class="material-icons">email</i></md-icon>
        <input ng-model="user.from" name="from" type="email" placeholder="From" required>

      </md-input-container>
      <md-input-container>
        <md-icon class="email"><i class="material-icons">email</i></md-icon>
        <input ng-model="user.to" id="To" name="to" type="email" placeholder="To" required>

      </md-input-container>
      <md-input-container >
        <md-icon class="email"><i class="material-icons">subject</i></md-icon>
        <input ng-model="user.sujet" id="To" name="sujet" type="text" placeholder="Sujet" required>
        <div ng-messages="sendMailForm.sujet.$error">
          <div ng-message="required">Champs requis.</div>
        </div>
      </md-input-container>


    </div>

    <md-whiteframe class="md-whiteframe-z1" layout layout-margin layout-padding layout-align="center center">
      <div class="" id="Preview">
        <em>En attente...</em>
      </div>
    </md-whiteframe>
    <div class="panel-footer">
      <em>En attente de l'envoi...</em>
    </div>
  </div>
</div>
