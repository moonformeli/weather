import autobind from 'autobind-decorator';

interface IBaseQuery {
  prefix: string;
  path: string;
  apiKey: string;
}

export default class BaseQuery implements IBaseQuery {
  prefix: string = '';
  path: string = '';
  apiKey: string = '';

  constructor({ prefix = '', path = '', apiKey = '' }: IBaseQuery) {
    this.prefix = prefix;
    this.path = path;
    this.apiKey = apiKey;
  }

  @autobind
  getQuery() {
    return `${this.prefix}/${this.path}`.replace(/\/\//g, '/');
  }
}
