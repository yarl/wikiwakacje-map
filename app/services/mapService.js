const MapService = function() {
  return {
    forceMapState: false,
    center: {
      lat: 52.093,
      lng: 19.468,
      zoom: 7
    }
  };
}

export default () => {
  angular
    .module('app')
    .factory('mapService', MapService);
}
