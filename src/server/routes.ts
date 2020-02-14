import { join } from 'path';

import routes from 'next-routes';

const page = (...path: string[]): string => join(...path);

export default new routes().add({
  name: 'home',
  pattern: '/home',
  page: page('home', 'Home')
});
