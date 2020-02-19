import { IncomingMessage, ServerResponse } from 'http';

import { NextPage, NextPageContext } from 'next';

import { IServerReq } from './IServer';

export type LunaPage<P = {}, R = {}> = NextPage<P, R>;
export type LunaRequest<ReqBody = {}> = IncomingMessage & ReqBody & IServerReq;
export type LunaResponse<ResBody = {}> = ServerResponse & ResBody;
export type LunaContext<ReqBody = {}, ResBody = {}> = Omit<
  NextPageContext,
  'req' | 'res'
> & {
  req?: LunaRequest<ReqBody>;
  res?: LunaResponse<ResBody>;
};
