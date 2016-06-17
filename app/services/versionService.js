const VersionService = function($timeout, $mdTheming, themeProvider) {
  var versions = {
    monuments: ['blue-grey', 'red'],
    nature: ['green', 'red'],
    art: ['pink', 'red']
  }

  function setVersion(version) {
      themeProvider.theme(version)
        .primaryPalette(versions[version][0])
        .accentPalette(versions[version][1]);
      $mdTheming.generateTheme(version);
      themeProvider.setDefaultTheme(version);
  }

  return {
      version: 'monuments',
      setVersion: setVersion
  }
}

export default () => {
  angular
    .module('app')
    .factory('versionService', VersionService);
}
