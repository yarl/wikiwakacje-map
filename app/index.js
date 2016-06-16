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
  .config(function($mdThemingProvider) {
    $mdThemingProvider.theme('default')
      .primaryPalette('blue-grey')
      .accentPalette('red');
  });

const MainComponent = {
  bindings: {},
  controller: function($scope) {
    let vm = this;

    vm.loading = {
      active: false,
      dragSearch: true
    };
    vm.cards = [];
    vm.highlight = "";
  },
  template: `<md-toolbar class="md-hue-2">
      <div class="md-toolbar-tools">
        <md-button class="md-icon-button" aria-label="Settings" ng-disabled="true">
          <md-icon>menu</md-icon>
        </md-button>
        <h2>
          <span>Wakacje z Wikipedią</span>
        </h2>
        <span flex></span>
        <md-button class="md-icon-button" aria-label="Favorite">
          <md-icon>favorite</md-icon>
        </md-button>
        <md-button class="md-icon-button" aria-label="More">
          <md-icon>more_vert</md-icon>
        </md-button>
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
