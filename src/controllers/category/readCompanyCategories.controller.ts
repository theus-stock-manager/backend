import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { readCompanyCategoriesService } from "../../services/category/readCompanyCategories.service";

export const readCompanyCategoriesController = async (
  req: Request,
  res: Response
) => {
  const { companyId } = req.params;

  const companyCategories = await readCompanyCategoriesService(companyId);

  return res.status(200).json(instanceToPlain(companyCategories));
};
