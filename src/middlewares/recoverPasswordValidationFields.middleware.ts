import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IRecoverPasswordRequest } from "../types/user";

export const recoverPasswordValidationFieldsMiddleware =
  (schema: SchemaOf<IRecoverPasswordRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IRecoverPasswordRequest = req.body;

      await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      next();
    } catch (err: any) {
      return res.status(400).json({
        status: "Error",
        code: 400,
        message: err.errors?.join(", "),
      });
    }
  };
