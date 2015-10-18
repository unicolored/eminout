<md-list ng-controller="ListCtrl">
  <md-subheader class="md-no-sticky">Liste des Contacts synchronisés</md-subheader>
  <md-list-item ng-repeat="person in people" ng-click="goToPerson(person.name, $event)">
    <img alt="{{ person.name }}" ng-src="{{ person.img }}" class="md-avatar" />
    <p>{{ person.name }}</p>
    <md-icon ng-click="doSecondaryAction($event)" aria-label="Open Chat" class="md-secondary md-hue-3 material-icons" ng-class="{'md-primary': person.newMessage}">mail</md-icon>
  </md-list-item>
</md-list>
