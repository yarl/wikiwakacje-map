const MapComponent = {
  bindings: {
    cards: '='
  },
  controller: function($scope, $http, dataService) {
    let vm = this;
    vm.bounds = "",
    vm.center = {
        lat: 52.093,
        lng: 19.468,
        zoom: 7
    };
    vm.events = {
        map: {
            enable: ['dragend'],
            logic: 'emit'
        }
    };

    $scope.$on('leafletDirectiveMap.dragend', function(event) {
      getMonuments();
    });

    function getMonuments() {
      if(vm.center.zoom < 12) {
        return;
      }

      dataService.getMonuments(vm.bounds).then((data) => {
        vm.cards = data;
      }, (data) => {
        //error
      })
    }

  },
  template: `<leaflet flex
      lf-center="$ctrl.center"
      event-broadcast="$ctrl.events"
      bounds="$ctrl.bounds"></leaflet>`
};

export default () => {
  angular
    .module('app')
    .component('wwMap', MapComponent);
}
