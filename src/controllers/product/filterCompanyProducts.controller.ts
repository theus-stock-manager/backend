import { Request, Response } from "express";
import { filterCompanyProductsService } from "../../services/product/filterCompanyProducts.service";
import { IFilterProduct } from "../../types/product";
import { instanceToPlain } from "class-transformer";

export const filterCompanyProductsController = async (
  req: Request,
  res: Response
) => {
  const { categoryName, name, stockLess, stockMore }: IFilterProduct = req.body;
  const { page, limit } = req.query;
  const { companyId } = req.params;

  const filteredProducts = await filterCompanyProductsService(
    { categoryName, name, stockLess, stockMore },
    req.baseUrl,
    Number(page),
    Number(limit),
    companyId
  );

  return res.status(200).json(instanceToPlain(filteredProducts));
};
