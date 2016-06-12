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
    this.cards = [];
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
      <div flex="40" style="overflow: auto;">
        <card ng-repeat="card in $ctrl.cards" data="card"></card>
      </div>
      <ww-map flex layout="row" cards="$ctrl.cards"></ww-map>
    </div>`
};

angular
  .module('app')
  .component('appMain', MainComponent);

components();
services();
