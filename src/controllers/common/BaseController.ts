import URL from 'url';

import { LunaRequest } from '@/models/common/interfaces/ILunaPage';
import { IServerReq, TRequest } from '@/models/common/interfaces/IServer';
import { AxiosRequestConfig } from 'axios';
import debug from 'debug';

import AxiosController from './AxiosController';

export type TRequestConfig = Omit<AxiosRequestConfig, 'url'> & { url: string };

const log = debug('Luna:BaseController');

export default class BaseController<
  R extends IServerReq = IServerReq
> extends AxiosController {
  constructor(private req?: LunaRequest<R> | TRequest<{}>) {
    super();
  }

  private getURL(config: TRequestConfig): string {
    if (!!this.req) {
      return config.url;
    }

    const parsed = URL.parse(config.url);
    return URL.format({
      ...parsed,
      pathname: `api/${parsed.pathname}`.replace(/\/+/g, '/')
    });
  }

  protected async call<T>(JSC: Record<string, any>, config: TRequestConfig) {
    const url = this.getURL(config);

    log('call', url, config);
    const { method = '' } = config;

    switch (method.toUpperCase()) {
      case 'GET':
        return await this.get<T>(JSC, url, config);
      default:
        return Promise.reject();
    }
  }
}
