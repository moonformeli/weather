import debug from 'debug';

import ConfigDev from './Config.dev';

const log = debug('Luna:Config');

export default (() => {
  log('RUN_MODE', process.env.RUN_MODE);
  if (process.env.RUN_MODE === 'development') {
    return new ConfigDev();
  }
  return new ConfigDev();
})();
