import { Request, Response } from "express";
import { updateCategoryService } from "../../services/category/updateCategory.service";
import { ICategoryRequest } from "../../types/category";
import { instanceToPlain } from "class-transformer";

export const updateCategoryController = async (req: Request, res: Response) => {
  const { name }: ICategoryRequest = req.body;
  const { categoryId } = req.params;

  const updatedCategory = await updateCategoryService({ name }, categoryId);

  return res.status(200).json(instanceToPlain(updatedCategory));
};
