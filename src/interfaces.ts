import { Request } from "express";
import * as core from "express-serve-static-core";

export interface SocketEvent {
  action: "created" | "updated" | "deleted" | "async";
  id: number;
}

export interface ServiceRequest<
  P = core.ParamsDictionary,
  ResBody = any,
  ReqBody = any,
  ReqQuery = core.Query,
  Locals extends Record<string, any> = Record<string, any>
> extends Request<P, ResBody, ReqBody, ReqQuery, Locals> {
  loginInfo?: TokenInfo;
}

export interface TokenInfo {
  id: number;
  name: string;
  permissions: string[];
  org: string[];
  assistantUserIds: string[];
  company?: Company;
}

export interface Permission {
  id: number;
  name: string;
  desc?: string;
}
export interface PermissionAssignment {
  id: number;
  perId: number;
  orgId: number;
  orgCode: string;
  withMembers: boolean;
}
export interface Org {
  id: number;
  code: string; // 2桁づつ　例：010202 => root->01->02->02
  name: string;
  desc?: string;
}

export interface Supplier {
  id: number;
  code: string;
  name: string;
  phoneNumber: string;
  email: string;
}

export interface SupplierMember {
  id: number;
  code: string;
  supplierId: number;
  name: string;
  kana: string;
  phoneNumber?: string;
  email: string;
}

export interface User {
  id: number;
  code?: string;
  localAccountId: string;
  name: string;
  kana: string;
  email: string;
  phone?: string;
  avatar?: string;
  themeId: number;
  active: boolean; // 0: block ; 1: active
  hireDate: number;
  retirementDate?: number;
}
export type UserOrgType = "admin" | "member" | "assistant";
export interface OrgUser {
  id: number;
  uId: number;
  orgId: number;
  type: UserOrgType;
}
export interface Company {
  id: number;
  name: string;
  kana: string;
  active: boolean; // 0: init ; 1: active
  primaryUserId: number;
  assistantUserIds: string;
}

export interface Theme {
  id: number;
  primary: string;
  secondary: string;
}

export interface Salary {
  id: number;
  uId: number;
  date: number;
  pay: number;
}
export interface ProjectAccountant {
  id: number;
  pId: number;
  uId: number;
}
export type ProjectMemberType = "leader" | "member";
export interface ProjectMember {
  id: number;
  pId: number;
  uId: number;
  type: ProjectMemberType;
}
export interface ProjectSupplier {
  id: number;
  pId: number;
  supplierId: number;
  SupplierMember?: number;
}
export interface ProjectOrg {
  id: number;
  pId: number;
  orgId: number;
  orgCode: string;
}

export type ProjectStatus = "受注前" | "実施中" | "完了";
export interface Project {
  id: number;
  code: string;
  name: string;
  scheduledStart: number;
  scheduledEnd: number;
  scheduledIncome: number;
  status: ProjectStatus;
}
export interface Income {
  id: number;
  code: string;
  pId: number;
  start: number;
  end: number;
  fee: number;
  average: number; // monthly average
}
export interface Cost {
  id: number;
  pId: number;
  uId: number;
  content: string;
  pay: number;
  date: number;
}

export interface Working {
  id: number;
  uId: number;
  pId: number;
  date: number;
  salary: number;
  workingTime: number;
  total: number;
}
