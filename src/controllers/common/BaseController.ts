import url from 'url';

import { LunaRequest } from '@/models/common/interfaces/ILunaPage';
import autobind from 'autobind-decorator';
import { AxiosRequestConfig } from 'axios';
import debug from 'debug';

import AxiosController from './AxiosController';

export type TRequestConfig = Omit<AxiosRequestConfig, 'url'>;

const log = debug('luna:BaseController');

export default class BaseController<R = {}> extends AxiosController {
  constructor(private req: LunaRequest<R>) {
    super();
  }

  @autobind
  private getURL(url: string): string {
    if (!!this.req) {
      return url;
    }
    return `api/${url}`;
  }

  // TODO: url 조립하는 게 너무 번잡함. 시급한 수정이 필요하다
  @autobind
  protected async call<T>(url: string, config: TRequestConfig) {
    log('call', url, config);
    const { method = '' } = config;

    switch (method.toUpperCase()) {
      case 'GET':
        return await this.get<T>(`http://${this.getURL(url)}`, config);
      default:
        return Promise.reject();
    }
  }
}
