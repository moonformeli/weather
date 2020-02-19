import Config from '@/config/Config';
import { TNext, TRequest, TResponse } from '@/models/common/interfaces/IServer';
import debug from 'debug';
import { Router } from 'express';

const log = debug('Luna:CommonRoute');

export enum ENRouteType {
  GET = 'get',
  POST = 'post'
}

export default abstract class CommonRouter {
  constructor(protected router: Router, protected prefix: string = '/api') {}

  protected reqPath(path: string): string {
    return `${this.prefix}/${path}`.replace(/\/\//g, '/');
  }

  protected setRoute(routeType: ENRouteType) {
    log('setRoute');
    return (
      path: string,
      ...handlers: Array<(req: TRequest, res: TResponse, next?: TNext) => any>
    ) => {
      this.router[routeType](this.reqPath(path), ...handlers);
    };
  }

  protected abstract routes(): Router;
}
