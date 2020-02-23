import { validate } from '@/utils/schema';
import ajv from 'ajv';
import axios, { AxiosRequestConfig } from 'axios';
import debug from 'debug';
import HttpStatusCodes from 'http-status-codes';

import AxiosEither from '../../services/AxiosEither';

const log = debug('Luna:AxiosController');

export default class AxiosController {
  private isClientError(status: number) {
    return (
      status >= HttpStatusCodes.BAD_REQUEST &&
      status < HttpStatusCodes.INTERNAL_SERVER_ERROR
    );
  }

  private isValid<T>(
    JSC: Record<string, any>,
    data: T
  ):
    | {
        valid: boolean;
        error: ajv.ErrorObject[];
      }
    | {
        valid: boolean;
        error: null;
      } {
    const valid = validate(JSC, data);
    return valid;
  }

  protected async get<T>(
    JSC: Record<string, any>,
    url: string,
    config: Omit<AxiosRequestConfig, 'url'>
  ) {
    log('get', url, config);

    try {
      const res = await axios.get<T>(url, config);
      const valid = this.isValid<T>(JSC, res.data);

      if (!valid.valid) {
        throw new Error(`JSC has occured an error.
          ${JSON.stringify(valid.error)}
        `);
      }

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
