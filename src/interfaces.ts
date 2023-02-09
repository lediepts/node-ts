import { Request } from "express";
import * as core from "express-serve-static-core";

export interface ServiceRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {}

export interface User {
  id: number;
  name: string;
}
export interface TokenInfo {
  id: number;
  name: string;
}
