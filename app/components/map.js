const MapComponent = {
  bindings: {
    loading: '=',
    cards: '=',
    highlight: '='
  },
  controller: function($scope, $http, $location, $timeout, dataService, mapService, versionService, leafletData) {
    let vm = this;
    vm.bounds = "",
    vm.markers = {};
    vm.center = mapService.center;
    vm.changeVersion = changeVersion;
    vm.events = {
        map: {
            enable: ['dragend', 'zoomend', 'click'],
            logic: 'emit'
        }
    };
    vm.dragSearch = true;
    vm.icon = mapService.icons.normal;

    $timeout(() => { getObjects(); });

    // LISTENERS

    $scope.$on('leafletDirectiveMap.dragend', (event, args) => {
      if(vm.loading.dragSearch) {
        $timeout(() => { getObjects(); });
      }
    });

    $scope.$on('leafletDirectiveMap.zoomend', (event, args) => {
      if(vm.loading.dragSearch) {
        $timeout(() => { getObjects(); });
      }
    });

    $scope.$on('leafletDirectiveMap.click', (event, args) => {
      if(versionService.getVersion() === "nature") {
        let coords = args.leafletEvent.latlng;
        $timeout(() => { getNature(coords); });
      }
    });

    $scope.$on('leafletDirectiveMarker.click', (event, args) => {
      vm.highlight = args.modelName;
    });

    $scope.$on('centerUrlHash', (event, centerHash) => {
        $location.search({ c: centerHash });
    });

    // FUNCTIONS

    function changeVersion(version) {
      vm.cards = [];
      vm.markers = {};
      versionService.setVersion(version);

      leafletData.getMap().then(function(map) {
        version === "nature" ?
          map.addLayer(mapService.tiles.gdos) :
          map.removeLayer(mapService.tiles.gdos);
      });
      $timeout(() => { getObjects(); });
    }

    function getObjects() {
      const version = versionService.version;
      if(version === "monuments") {
        getMonuments();
      } else if (version === "art") {
        getArt();
      }
    }

    function getNature(coords) {
      if(vm.center.zoom < 12 || !vm.center) {
        vm.loading.active = false;
        vm.cards = [];
        vm.markers = {};
        vm.highlight = "";
        return;
      }

      vm.loading.active = true;
      dataService.getNature(coords).then((data) => {
        data = data.data.map(element => {
          return {
            name: element.info.name || element.info.obiekt,
            id: element.info.kodinspire,
            type: element.layer
          }
        });

        vm.cards = data;
        vm.loading.active = false;
        vm.highlight = "";
      })
    }

    function getArt() {
      if(vm.center.zoom < 12 || !vm.bounds) {
        vm.loading.active = false;
        vm.cards = [];
        vm.markers = {};
        vm.highlight = "";
        return;
      }

      if(mapService.forceMapState) {
        mapService.forceMapState = false;
        return;
      }

      vm.loading.active = true;
      dataService.getArt(vm.bounds).then((data) => {
        vm.loading.active = false;
        vm.cards = data.data.elements;
        vm.markers = {};
        vm.highlight = "";

        //debugger;

        for(let element of data.data.elements) {
          vm.markers[element.id] = {
            lat: element.lat, lng: element.lon,
            icon: vm.icon
          }
        }
      }, (data) => {
        vm.loading.active = false;
        vm.cards = [];
        //error
      })
    }

    function getMonuments() {
      if(vm.center.zoom < 12 || !vm.bounds) {
        vm.loading.active = false;
        vm.cards = [];
        vm.markers = {};
        vm.highlight = "";
        return;
      }

      if(mapService.forceMapState) {
        mapService.forceMapState = false;
        return;
      }

      vm.loading.active = true;
      dataService.getMonuments(vm.bounds).then((data) => {
        vm.loading.active = false;
        vm.cards = data;
        vm.markers = {};
        vm.highlight = "";

        for(let element of data) {
          vm.markers[element.id] = {
            lat: element.lat, lng: element.lon,
            icon: vm.icon
          }
        }
      }, (data) => {
        vm.loading.active = false;
        vm.cards = [];
        //error
      })
    }
  },
  template: `<div class="ww-map-switcher">
    <md-button class="md-raised"
               ng-click="$ctrl.changeVersion('monuments')">
      <md-icon>account_balance</md-icon>
      <span>Zabytki</span>
    </md-button>
    <md-button class="md-raised"
               ng-click="$ctrl.changeVersion('nature')">
      <md-icon>cloud</md-icon>
      <span>Przyroda</span>
    </md-button>
    <md-button class="md-raised"
               ng-click="$ctrl.changeVersion('art')">
      <md-icon>extension</md-icon>
      <span>Sztuka</span>
    </md-button>
  </div>
  <leaflet flex
      lf-center="$ctrl.center"
      url-hash-center="yes"
      event-broadcast="$ctrl.events"
      markers="$ctrl.markers"
      bounds="$ctrl.bounds"></leaflet>`
};

export default () => {
  angular
    .module('app')
    .component('wwMap', MapComponent);
}
