import data from './data';
import mapService from './mapService';
import versionService from './versionService';

export default () => {
  data();
  mapService();
  versionService();
}
