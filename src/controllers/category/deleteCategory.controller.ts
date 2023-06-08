import { Request, Response } from "express";
import { deleteCategoryService } from "../../services/category/deleteCategory.service";

export const deleteCategoryController = async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const _ = await deleteCategoryService(categoryId);

  return res.status(204).json({});
};
