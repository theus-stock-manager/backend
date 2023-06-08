import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppError } from "../errors";
import "dotenv/config";

export const isAuthenticatedMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { authorization } = req.headers;

  if (!authorization) {
    throw new AppError(401, "Token de authenticação não enviado");
  }

  let tokenArray = authorization.split(" ");
  let token: string;

  if (tokenArray.length > 1) {
    if (tokenArray[0].toLowerCase() !== "bearer") {
      throw new AppError(
        400,
        "O token de autenticação deve ser do tipo Bearer"
      );
    }

    token = tokenArray[1];
  } else {
    token = tokenArray[0];
  }

  jwt.verify(token, process.env.SECRET_KEY!, (err: any, decoded: any) => {
    if (err) {
      throw new AppError(401, "token invalido ou expirado");
    }

    req.userId = decoded.userId;
    req.userName = decoded.userName;
    req.userIsAdm = decoded.userIsAdm;
    req.userIsStaff = decoded.userIsStaff;
    req.userCompanyId = decoded.userCompanyId;

    next();
  });
};
