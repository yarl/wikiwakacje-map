import $ from 'jquery';

const MapComponent = {
  bindings: {},
  controller: function($scope, $http) {
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

      const c = vm.bounds;
      $.ajax({
         type: 'GET',
          url: "https://tools.wmflabs.org/heritage/api/api.php",
          data: {
            action: "search",
            format: "json",
            limit: "100",
            callback: "jsonCallback",
            srcountry: "pl",
            bbox: [c.southWest.lng, c.southWest.lat, c.northEast.lng, c.northEast.lat].join(',')
          },
          async: false,
          jsonpCallback: 'jsonCallback',
          contentType: "application/json",
          dataType: 'jsonp',
          success: function(json) {
             console.log('yes', json);
          },
          error: function(e) {
             console.log('no', e);
          }
      });
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
