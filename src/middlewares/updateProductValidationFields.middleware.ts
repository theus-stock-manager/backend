import { Request, Response, NextFunction } from "express";
import { SchemaOf } from "yup";
import { AppError } from "../errors";
import { IProductRequest } from "../types/product";

export const updateProductValidationFieldsMiddleware =
  (schema: SchemaOf<IProductRequest>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data: IProductRequest = req.body;

      await schema.validate(data, {
        abortEarly: false,
        stripUnknown: true,
      });

      if (
        !data.name &&
        data.categoryName === undefined &&
        !data.purchasePrice &&
        !data.salePrice &&
        !data.stock
      ) {
        throw new AppError(406, "Não há nada para atualizar");
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
