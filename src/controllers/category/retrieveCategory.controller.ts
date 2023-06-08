import { Request, Response } from "express";
import { retrieveCategoryService } from "../../services/category/retrieveCategory.service";
import { instanceToPlain } from "class-transformer";

export const retrieveCategoryController = async (
  req: Request,
  res: Response
) => {
  const { categoryId } = req.params;

  const category = await retrieveCategoryService(categoryId);

  return res.status(200).json(instanceToPlain(category));
};
