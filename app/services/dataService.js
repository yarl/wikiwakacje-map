import $ from 'jquery';
import proj4 from 'proj4';

const DataService = function($http, $q) {
  let lastCoord = {};

  const service = {
    getArt: getArt,
    getMonuments: getMonuments,
    getNature: getNature,
    getLastCoord: getLastCoord
  }

  return service;

  ////

  function getArt(bounds) {
    const b = bounds;
    const bbox = [b.southWest.lat, b.southWest.lng, b.northEast.lat, b.northEast.lng].join(',');
    return $http({
        method : "POST",
        url : "http://overpass-api.de/api/interpreter",
        data: ['[out:json][timeout:25];',
          '(',
            'node["historic"="wayside_shrine"]('+bbox+');',
            'node["historic"="memorial"]('+bbox+');',
            'node["historic"="monument"]('+bbox+');',
            'node["man_made"="cross"]('+bbox+');',
            'node["tourism"="artwork"]('+bbox+');',
          ');',
          'out body; >; out skel qt;'].join("")
    });
  }

  function getMonuments(bounds) {
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

  function getNature(coords) {
    lastCoord = coords;
    const coor = proj4('WGS84', '+proj=tmerc +lat_0=0 +lon_0=19 +k=0.9993 +x_0=500000 +y_0=-5300000 +ellps=GRS80 +units=m +no_defs', [coords.lng, coords.lat]);
    return $http({
        method : "GET",
        url : "gdos.php",
        params: {x: coor[0], y: coor[1]}
    });
  }

  function getLastCoord() {
    return lastCoord;
  }
}

export default () => {
  angular
    .module('app')
    .factory('dataService', DataService);
}
