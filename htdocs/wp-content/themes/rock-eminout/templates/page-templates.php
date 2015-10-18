<md-list ng-controller="ListCtrl">
  <md-subheader class="md-no-sticky">Liste des Templates synchronisés</md-subheader>
  <md-list-item class="md-3-line" ng-repeat="template in templates" ng-click="goToPerson(template.name, $event)">
    <div class="md-list-item-text">
    <h3>{{ template.name }}</h3>
    <h4>{{ template.subject }}</h4>
    <p>{{ template.from_email }}</p>
    </div>
    <md-icon ng-click="doSecondaryAction($event)" aria-label="Open Chat" class="md-secondary md-hue-3 material-icons" ng-class="{'md-primary': template.newMessage}">chevron_right</md-icon>
  </md-list-item>
</md-list>
