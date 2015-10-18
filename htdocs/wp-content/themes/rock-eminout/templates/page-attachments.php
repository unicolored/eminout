<md-list ng-controller="ListCtrl">
  <md-subheader class="md-no-sticky">Liste des Pièces jointes</md-subheader>
  <md-list-item ng-repeat="attachment in attachments" ng-click="goToPerson(person.name, $event)">
    <img alt="{{ attachment.name }}" ng-src="{{ attachment.img }}" class="md-avatar" />
    <p>{{ attachment.name }}</p>
    <md-icon ng-click="doSecondaryAction($event)" aria-label="Open Chat" class="md-secondary md-hue-3 material-icons" ng-class="{'md-primary': attachment.newMessage}">mail</md-icon>
  </md-list-item>
</md-list>
