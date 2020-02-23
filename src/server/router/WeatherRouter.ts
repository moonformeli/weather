import { TNext } from '@/models/common/interfaces/IServer';
import debug from 'debug';
import { Router } from 'express';

import CommonRouter, { ENRouteType } from './CommonRouter';
import WeatherRouterController from './controller/WeatherRouterController';

const log = debug('Luna:WeatherRoute');

export default class WeatherRoute extends CommonRouter {
  controller: WeatherRouterController = new WeatherRouterController();

  constructor() {
    super(Router());
  }

  routes() {
    log('routes');

    this.setRoute(ENRouteType.GET)(
      '/v2.0/forecast/hourly',
      this.controller.getHourlyWeather
    );

    this.setRoute(ENRouteType.GET)(
      '/v2.0/current',
      this.controller.getCurrentWeather
    );

    return this.router;
  }
}
