import $ from 'jquery';

const DataService = function($q) {
  const functions = {
    getMonuments: (bounds) => {
      const b = bounds;
      return $q((resolve, reject) => {
        $.ajax({
           type: 'GET',
            url: "https://tools.wmflabs.org/heritage/api/api.php",
            data: {
              action: "search",
              format: "json",
              limit: "100",
              callback: "jsonCallback",
              srcountry: "pl",
              bbox: [b.southWest.lng, b.southWest.lat, b.northEast.lng, b.northEast.lat].join(',')
            },
            async: false,
            jsonpCallback: 'jsonCallback',
            contentType: "application/json",
            dataType: 'jsonp',
            success: (data) => {
               resolve(data.monuments ? data.monuments : false);
            },
            error: (data) => {
               reject(data);
            }
        });
      });
    }
  }

  return functions;
}

export default () => {
  angular
    .module('app')
    .factory('dataService', DataService);
}
