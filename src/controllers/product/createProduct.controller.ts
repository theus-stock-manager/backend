import { Request, Response } from "express";
import { createProductService } from "../../services/product/createProduct.service";
import { IProductRequest } from "../../types/product";
import { instanceToPlain } from "class-transformer";

export const createProductController = async (req: Request, res: Response) => {
  const {
    categoryName,
    name,
    purchasePrice,
    salePrice,
    stock,
    companyId,
  }: IProductRequest = req.body;

  const product = await createProductService({
    categoryName,
    name,
    purchasePrice,
    salePrice,
    stock,
    companyId,
  });

  return res.status(201).json(instanceToPlain(product));
};
