const CardComponent = {
  bindings: {
    data: '='
  },
  controller: function($mdMedia, $mdDialog, $timeout, mapService) {
    let vm = this;
    vm.data.name_ = dewikify(vm.data.name);
    vm.data.address_ = dewikify(vm.data.address);
    vm.showDetails = showDetails;
    vm.showOnMap = showOnMap;

    console.log(vm.data);

    // FUNCTIONS

    function dewikify(text) {
      return text.replace(/\[\[[^\[\]\|]*\|([^\[\]\|]*)\]\]/g, "$1");
    }

    function showOnMap() {
      $timeout(() => {
        mapService.forceMapState = true;
        mapService.center.lat = vm.data.lat;
        mapService.center.lng = vm.data.lon;
        mapService.center.zoom = 17;
      })
    }

    function showDetails(event, data) {
      $mdDialog.show({
        controller: function ($scope, $mdDialog) {
          $scope.data = data;
          $scope.close = function() {
            $mdDialog.hide();
          };
        },
        template: `<md-dialog aria-label="Szczegóły" ng-cloak>
            <form>
              <md-toolbar>
                <div class="md-toolbar-tools">
                  <h2>Szczegóły zabytku</h2>
                  <span flex></span>
                  <md-button class="md-icon-button" ng-click="close()">
                    <md-icon aria-label="Zamknij">close</md-icon>
                  </md-button>
                </div>
              </md-toolbar>
              <md-dialog-content class="ww-details">
                <div class="md-dialog-content">
                  <div layout="row">
                    <div class="ww-details-info" flex="60">
                      <h2>{{data.name_}}</h2>
                      <p>{{data.address_}}</p>
                      <p>#{{data.id}}</p>
                    </div>
                    <div class="ww-details-photo"
                         flex="40" layout="row" layout-align="center center">
                      <img class="card-photo"
                           ng-if="data.image"
                           ng-src="http://commons.wikimedia.org/w/thumb.php?f={{data.image}}&w=600"/>
                    </div>
                  </div>
                </div>
              </md-dialog-content>
              <md-dialog-actions layout="row">
                <span flex></span>
                <md-button ng-click="close()">
                  Zamknij
                </md-button>
              </md-dialog-actions>
            </form>
          </md-dialog>`,
        parent: angular.element(document.body),
        targetEvent: event,
        clickOutsideToClose: true,
        fullscreen: false
      })
      .then(function(answer) {}, function() {});
    }
  },
  template: `<md-card md-theme="default" md-theme-watch class="ww-card">
        <md-card-title>
          <md-card-title-text>
            <span class="md-headline"><small>{{$ctrl.data.name_}}</small></span>
            <span class="md-subhead">{{$ctrl.data.address_}}</span>
          </md-card-title-text>
          <md-card-title-media>
            <div class="md-media-sm card-media"
                 layout="row" layout-align="center center"
                 ng-if="$ctrl.data.image">
              <img class="card-photo" ng-src="http://commons.wikimedia.org/w/thumb.php?f={{$ctrl.data.image}}&w=200"/>
            </div>
          </md-card-title-media>
        </md-card-title>
        <md-card-actions layout="row" layout-align="end center">
          <md-button ng-click="$ctrl.showDetails($event, $ctrl.data)">Więcej informacji</md-button>
          <md-button ng-click="$ctrl.showOnMap()">Mapa</md-button>
        </md-card-actions>
      </md-card>`
};

export default () => {
  angular
    .module('app')
    .component('card', CardComponent);
}
