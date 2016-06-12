import angular from 'angular';
import ngMaterial from 'angular-material';
import leaflet from 'leaflet';
import ngLeaflet from 'angular-leaflet-directive';

import './style.css';
import 'angular-material/angular-material.css';
import 'material-design-icons/iconfont/material-icons.css';
import 'leaflet/dist/leaflet.css';

import components from './components';

angular.module('app', ['ngMaterial', 'leaflet-directive']);

const MainComponent = {
  bindings: {},
  controller: function($scope) {
    this.greeting = "Welcome";
    this.name = "Edward";

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
    <div layout="row" layout-xs="column">
      <div style="width: 300px">
        <card></card>
        <card></card>
        <card></card>
        <hello></hello>
      </div>
      <ww-map flex layout="row"></ww-map>
    </div>`
};

angular
  .module('app')
  .component('appMain', MainComponent);

components();
