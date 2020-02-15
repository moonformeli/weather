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
  protected async call<T>(url: string, config: TRequestConfig) {
    log('call', url, config);
    const { method = '' } = config;

    switch (method.toUpperCase()) {
      case 'GET':
        return await this.get<T>(url, config);
      default:
        return Promise.reject();
    }
  }
}
