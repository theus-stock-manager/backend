import { Request, Response, NextFunction } from "express";
import { AppError } from "../errors";

export const isStaffOrOwnerMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { userIsStaff, userId } = req;
  const { userId: id } = req.params;

  if (userIsStaff || userId === id) {
    next();
  } else {
    throw new AppError(
      401,
      "Esta rota só pode ser acessada por um staff de manutenção de código autorizado ou pelo dono do recurso"
    );
  }
};
