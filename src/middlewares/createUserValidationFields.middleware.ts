import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { IUserRequest } from "../types/user";

export const createUserValidationFieldsMiddleware =
  (schema: SchemaOf<IUserRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IUserRequest = req.body;

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
