import { IncomingMessage, ServerResponse } from 'http';

import { NextPage, NextPageContext } from 'next';

export type LunaPage<P = {}, R = {}> = NextPage<P, R>;
export type LunaRequest<ReqBody = {}> = IncomingMessage & ReqBody;
export type LunaResponse<ResBody = {}> = ServerResponse & ResBody;
export type LunaContext<ReqBody = {}, ResBody = {}> = Omit<
  NextPageContext,
  'req' | 'res'
> & {
  req?: LunaRequest<ReqBody>;
  res?: LunaResponse<ResBody>;
};
