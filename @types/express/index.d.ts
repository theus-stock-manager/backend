import * as express from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userName?: string;
      userCompanyId?: string;
      userIsStaff?: boolean;
      userIsAdm?: boolean;
    }
  }
}
