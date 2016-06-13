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

angular.module('app', ['ngMaterial', 'leaflet-directive']);

const MainComponent = {
  bindings: {},
  controller: function($scope) {
    let vm = this;

    vm.loading = false;
    vm.cards = [];
    vm.highlight = "";
  },
  template: `<md-toolbar class="md-hue-2">
      <div class="md-toolbar-tools">
        <md-button class="md-icon-button" aria-label="Settings" ng-disabled="true">
          <md-icon>menu</md-icon>
        </md-button>
        <h2>
          <span>Toolbar with Disabled/Enabled Icon Buttons</span>
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
    <div layout="row" layout-xs="column" style="height: calc(100vh - 48px)">
      <div class="ww-sidebar"
           flex="40" layout="column" layout-align="start center">
        <md-progress-circular md-mode="indeterminate"
                              md-diameter="60"
                              ng-show="$ctrl.loading"></md-progress-circular>
        <card ng-repeat="card in $ctrl.cards"
              ng-class="$ctrl.highlight === card.id ? 'active' : 'inactive'"
              data="card"></card>
      </div>
      <ww-map flex layout="row"
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
