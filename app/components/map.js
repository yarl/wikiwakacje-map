const MapComponent = {
  bindings: {
    loading: '=',
    cards: '=',
    highlight: '='
  },
  controller: function($scope, $http, $location, $timeout, dataService, mapService) {
    let vm = this;
    vm.bounds = "",
    vm.markers = {};
    vm.center = mapService.center;
    vm.events = {
        map: {
            enable: ['dragend', 'zoomend'],
            logic: 'emit'
        }
    };
    vm.dragSearch = true;
    vm.icon = {
        iconUrl: 'data/marker.png',
        shadowUrl: 'data/marker-shadow.png',
        iconSize:     [29, 41],
        shadowSize:   [41, 41],
        iconAnchor:   [15, 41],
        shadowAnchor: [12, 41],
    };

    $timeout(() => { getMonuments(); });

    // LISTENERS

    $scope.$on('leafletDirectiveMap.dragend', (event, args) => {
      if(vm.loading.dragSearch) {
        $timeout(() => { getMonuments(); });
      }
    });

    $scope.$on('leafletDirectiveMap.zoomend', (event, args) => {
      if(vm.loading.dragSearch) {
        $timeout(() => { getMonuments(); });
      }
    });

    $scope.$on('leafletDirectiveMarker.click', (event, args) => {
      vm.highlight = args.modelName;
    });

    $scope.$on('centerUrlHash', (event, centerHash) => {
        $location.search({ c: centerHash });
    });

    // FUNCTIONS

    function getMonuments() {
      if(vm.center.zoom < 12 || !vm.bounds || mapService.forceMapState) {
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
        console.log(vm.markers);
      }, (data) => {
        //error
      })
    }
  },
  template: `<leaflet flex
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
