import { IConfig } from '@/config/interfaces/IConfig';
import { NextFunction, Request, Response } from 'express';
import { Params, ParamsDictionary } from 'express-serve-static-core';

export interface IServerReq {
  Config: IConfig;
}
export type TRequest<T extends Params = ParamsDictionary> = Request<T> &
  Partial<IServerReq>;
export type TResponse = Response;
export type TNext = NextFunction;
