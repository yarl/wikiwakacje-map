const CardComponent = {
  bindings: {
    data: '='
  },
  controller: function($mdMedia, $mdDialog, $timeout, $window, mapService, versionService, dataService) {
    this.$onInit = function () {
      vm.data.name_ = dewikify(vm.data.name);
      vm.data.address_ = dewikify(vm.data.address);
    };

    let vm = this;
    vm.showDetails = showDetails;
    vm.showOnMap = showOnMap;
    vm.upload = upload;
    vm.version = versionService.getVersion();

    // FUNCTIONS

    function dewikify(text) {
      return text ? text.replace(/\[\[[^\[\]\|]*\|([^\[\]\|]*)\]\]/g, "$1") : "";
    }

    function showOnMap() {
      $timeout(() => {
        mapService.forceMapState = true;
        mapService.center.lat = vm.data.lat;
        mapService.center.lng = vm.data.lon;
        mapService.center.zoom = 17;
      })
    }

    function upload() {
      let url = "https://commons.wikimedia.org/w/index.php?title=Special:UploadWizard&campaign=";
      if(vm.version === "monuments") {
        const category = vm.data.commonscat || "Cultural heritage monuments in " + vm.data.adm3;
        url += "wikiwakacje-z&descriptionlang=pl&description="+vm.data.name_+"&categories="+category+"&id="+vm.data.id;
        url += "&lat="+vm.data.lat+"&lon="+vm.data.lon;
      } else if(vm.version === "nature") {
        url += "wikiwakacje-n&descriptionlang=pl&description="+vm.data.name+"&categories="+vm.data.name+"&id="+vm.data.id;
        url += "&lat="+dataService.getLastCoord().lat+"&lon="+dataService.getLastCoord().lng;
      }
      $window.open(url, "_blank");
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
                           ng-src="http://commons.wikimedia.org/w/thumb.php?f={{data.image}}&w=200"/>
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
  template: getTemplate()
};

function getTemplate() {
  return `<md-card md-theme="default" md-theme-watch class="ww-card">
        <md-card-title>
          <md-card-title-text ng-show="$ctrl.version === 'monuments'">
            <span class="md-headline"><small>{{$ctrl.data.name_}}</small></span>
            <span class="md-subhead">{{$ctrl.data.address_}}</span>
          </md-card-title-text>
          <md-card-title-text ng-show="$ctrl.version === 'nature'">
            <span class="md-headline"><small>{{$ctrl.data.name}}</small></span>
            <span class="md-subhead"></span>
          </md-card-title-text>
          <md-card-title-media ng-if="$ctrl.version === 'monuments'">
            <div class="md-media-sm card-media"
                 layout="row" layout-align="center center"
                 ng-if="$ctrl.data.image">
              <img class="card-photo" ng-src="http://commons.wikimedia.org/w/thumb.php?f={{$ctrl.data.image}}&w=200"/>
            </div>
          </md-card-title-media>
        </md-card-title>
        <md-card-actions layout="row" layout-align="end center">
          <md-button ng-click="$ctrl.showDetails($event, $ctrl.data)" ng-hide="true">Więcej informacji</md-button>
          <md-button ng-if="$ctrl.version === 'monuments'" ng-click="$ctrl.showOnMap()">Mapa</md-button>
          <md-button ng-click="$ctrl.upload()">Prześlij zdjęcia</md-button>
        </md-card-actions>
      </md-card>`;
}

export default () => {
  angular
    .module('app')
    .component('card', CardComponent);
}
