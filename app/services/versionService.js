const VersionService = function($timeout, $mdTheming, themeProvider) {
  const versions = {
    monuments: ['blue-grey', 'red'],
    nature: ['green', 'red'],
    art: ['pink', 'red']
  }

  const service = {
    version: 'monuments',
    getVersion: getVersion,
    setVersion: setVersion
  }

  return service;

  ////

  function getVersion() {
    return service.version;
  }

  function setVersion(version) {
      themeProvider.theme(version)
        .primaryPalette(versions[version][0])
        .accentPalette(versions[version][1]);
      $mdTheming.generateTheme(version);
      themeProvider.setDefaultTheme(version);
      service.version = version;
  }
}

export default () => {
  angular
    .module('app')
    .factory('versionService', VersionService);
}
