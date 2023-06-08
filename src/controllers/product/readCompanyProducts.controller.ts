import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { readCompanyProductsService } from "../../services/product/readCompanyProducts.service";

export const readCompanyProductsController = async (
  req: Request,
  res: Response
) => {
  const { companyId } = req.params;
  const { page, limit } = req.query;

  const products = await readCompanyProductsService(
    req.baseUrl,
    Number(page),
    Number(limit),
    companyId
  );

  return res.status(200).json(instanceToPlain(products));
};
