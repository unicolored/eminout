<md-list ng-controller="ListCtrl">
  <md-subheader class="md-no-sticky">Liste des Templates synchronisés</md-subheader>
  <md-list-item ng-repeat="template in templates" ng-click="goToPerson(person.name, $event)">
    <img alt="{{ template.name }}" ng-src="{{ template.img }}" class="md-avatar" />
    <p>{{ template.name }}</p>
    <md-icon ng-click="doSecondaryAction($event)" aria-label="Open Chat" class="md-secondary md-hue-3 material-icons" ng-class="{'md-primary': template.newMessage}">mail</md-icon>
  </md-list-item>
</md-list>
