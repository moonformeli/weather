import autobind from 'autobind-decorator';
import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import HttpStatusCodes from 'http-status-codes';

import AxiosEither from '../../services/AxiosEither';

const log = debug('luna:AxiosController');

export default class AxiosController {
  @autobind
  private isClientError(status: number) {
    return (
      status >= HttpStatusCodes.BAD_REQUEST &&
      status < HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  @autobind
  protected async get<T>(url: string, config: Omit<AxiosRequestConfig, 'url'>) {
    log('get', url);

    try {
      const res = await axios.get<T>(url, config);

      if (!res || this.isClientError(res.status)) {
        return AxiosEither.left<null>({
          data: null,
          status: res.status,
          statusText: res.statusText
        });
      }

      return AxiosEither.right<T>({
        data: res.data,
        status: res.status,
        statusText: res.statusText
      });
    } catch (e) {
      console.error(e);

      return AxiosEither.left<null>({
        data: null,
        status: 404,
        statusText: e
      });
    }
  }
}
