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
            enable: ['dragend'],
            logic: 'emit'
        }
    };

    $scope.$on('leafletDirectiveMap.dragend', function(event) {
      vm.loading = true;
      vm.markers = {};
      vm.cards = [];
      getMonuments();
    });

    $scope.$on('leafletDirectiveMarker.mouseover', function(event, args) {
      vm.highlight = args.modelName;
    });

    function getMonuments() {
      if(vm.center.zoom < 12) {
        return;
      }

      dataService.getMonuments(vm.bounds).then((data) => {
        vm.loading = false;
        vm.cards = data;

        for(let element of data) {
          vm.markers[element.id] = {
            lat: element.lat,
            lng: element.lon,
            message: element.name
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
      event-broadcast="$ctrl.events"
      markers="$ctrl.markers"
      bounds="$ctrl.bounds"></leaflet>`
};

export default () => {
  angular
    .module('app')
    .component('wwMap', MapComponent);
}
