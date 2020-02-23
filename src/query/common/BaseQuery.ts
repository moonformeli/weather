import url, { UrlObject } from 'url';

interface IBaseQuery {
  prefix?: string;
  baseURL?: string;
  apiKey?: string;
}

export default class BaseQuery implements IBaseQuery {
  prefix: string = '';
  baseURL: string = '';
  apiKey: string = '';

  constructor({ prefix = '', baseURL = '', apiKey = '' }: IBaseQuery) {
    this.prefix = prefix;
    this.baseURL = baseURL;
    this.apiKey = apiKey;
  }

  // FIXME: Config 에서 프로토콜을 분리할 수 있게되면 여기도 추가 작업 필요하다
  getQuery(config: UrlObject) {
    return url.format(config);
  }
}
