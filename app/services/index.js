import dataService from './dataService';
import mapService from './mapService';
import versionService from './versionService';

export default () => {
  dataService();
  mapService();
  versionService();
}
