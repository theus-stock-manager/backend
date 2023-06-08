import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../errors";
import { IUserRequest } from "../types/user";

export const updateUserValidationFieldsMiddleware =
  (schema: SchemaOf<IUserRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IUserRequest = req.body;
      const { userIsStaff } = req;

      if (
        !data.name &&
        !data.isAdm &&
        !data.password &&
        !data.securityAnswer &&
        !data.securityAsk
      ) {
        throw new AppError(406, "Não há nada para atualizar");
      }

      await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (data.isAdm && !userIsStaff) {
        req.body.isAdm = false;
      }

      next();
    } catch (err: any) {
      if (err instanceof AppError) {
        throw new AppError(err.statusCode, err.message);
      } else {
        return res.status(400).json({
          status: "Error",
          code: 400,
          message: err.errors?.join(", "),
        });
      }
    }
  };
