import angular from 'angular';
import ngMaterial from 'angular-material';
import leaflet from 'leaflet';
import ngLeaflet from 'angular-leaflet-directive';

import './style.scss';
import 'angular-material/angular-material.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'leaflet/dist/leaflet.css';

import components from './components';
import services from './services';

angular.module('app', ['ngMaterial', 'leaflet-directive'])
  .config(['$mdThemingProvider', '$provide', function($mdThemingProvider, $provide) {
      $mdThemingProvider.generateThemesOnDemand(true);
      $mdThemingProvider.alwaysWatchTheme(true);
      $provide.value('themeProvider', $mdThemingProvider);
  }]);

const MainComponent = {
  bindings: {},
  controller: function($scope, $mdTheming, dataService, versionService) {
    let vm = this;

    vm.loading = {
      active: false,
      dragSearch: true
    };
    vm.cards = [];
    vm.highlight = "";

    versionService.setVersion('monuments');
  },
  template: `<md-toolbar class="md-hue-2">
      <div class="md-toolbar-tools">
        <md-button class="md-icon-button" aria-label="Settings" ng-disabled="true">
          <md-icon>menu</md-icon>
        </md-button>
        <h2>
          <a href="http://wikiwakacje.pl">Wikiwakacje</a>
        </h2>
        <span flex></span>
      </div>
    </md-toolbar>
    <div class="ww-container" layout="row">
      <ww-sidebar flex="40"
                  cards="$ctrl.cards"
                  loading="$ctrl.loading"
                  highlight="$ctrl.highlight"></ww-sidebar>
      <ww-map flex layout="column"
              cards="$ctrl.cards"
              loading="$ctrl.loading"
              highlight="$ctrl.highlight"></ww-map>
    </div>`
};

angular
  .module('app')
  .component('appMain', MainComponent);

components();
services();
