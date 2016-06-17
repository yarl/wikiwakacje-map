const MapService = function() {
  return {
    forceMapState: false,
    center: {
      lat: 52.093,
      lng: 19.468,
      zoom: 7
    },
    icons: {
      normal: {
          iconUrl: 'data/marker-red.png',
          shadowUrl: 'data/marker-shadow.png',
          iconSize:     [29, 41],
          shadowSize:   [41, 41],
          iconAnchor:   [15, 41],
          shadowAnchor: [12, 41],
      }
    }
  }
}

export default () => {
  angular
    .module('app')
    .factory('mapService', MapService);
}
