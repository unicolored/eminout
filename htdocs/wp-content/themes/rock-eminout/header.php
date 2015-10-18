<!DOCTYPE html>
<!--[if lt IE 7]> <html class="no-js lt-ie9 lt-ie8 lt-ie7" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie9 lt-ie8" <?php language_attributes(); ?>> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie9" <?php language_attributes(); ?>> <![endif]-->
<!--[if gt IE 8]><!-->
<html class="no-js" <?php language_attributes(); ?> ng-app="totoro">
<!--<![endif]-->
<head>
  <meta charset="<?php echo get_bloginfo( 'charset' ) ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <base href="/">

  <?php
  wp_head();
  ?>
</head>

<body <?php body_class( array('rock') ); ?> layout="column" ng-controller="AppCtrl">

  <!-- Uses a header that scrolls with the text, rather than staying locked at the top -->
  <?php get_template_part('templates/toolbar') ?>

  <div layout="row" flex>


    <md-sidenav layout="column" class="md-sidenav-left md-whiteframe-z2" md-component-id="left">
      <md-toolbar layout="row">
        <div class="md-toolbar-tools">
          <md-button class="md-icon-button" aria-label="Settings" ng-click="toggleSidenav('left')">
            <md-icon aria-label="Menu"><i class="material-icons">menu</i></md-icon>
          </md-button>
          <h2>
            <?php print get_queried_object()->post_title ?>
          </h2>

        </div>
      </md-toolbar>

      <md-list-item ng-click="navigateTo('mails/', $event)">
        <md-icon class="material-design">subject</md-icon>
        <p>Mails</p>
      </md-list-item>
      <md-list-item ng-click="navigateTo('templates/', $event)">
        <md-icon class="material-design">color_lens</md-icon>
        <p>Templates</p>
      </md-list-item>
      <md-list-item ng-click="navigateTo('contacts/', $event)">
        <md-icon class="material-design">contacts</md-icon>
        <p>Contacts</p>
      </md-list-item>
      <md-list-item ng-click="navigateTo('attachments/', $event)">
        <md-icon class="material-design">attach_file</md-icon>
        <p>Pièces jointes</p>
      </md-list-item>
      <md-list-item ng-click="navigateTo('settings/', $event)">
        <md-icon class="material-design">settings</md-icon>
        <p>Paramètres</p>
      </md-list-item>
    </md-sidenav>
    <div layout="column" flex id="content">
      <md-content layout="column" flex>
