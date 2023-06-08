import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Category } from "../../entities/category";
import { ICategoryRequest } from "../../types/category";

export const updateCategoryService = async (
  { name }: ICategoryRequest,
  categoryId: string
): Promise<Category> => {
  if (!name) {
    throw new AppError(400, "Nada para atualizar");
  } else if (!categoryId) {
    throw new AppError(
      400,
      "Id da categoria não informado nos parâmetros de rota"
    );
  }

  const categoryRepo = AppDataSource.getRepository(Category);
  const category = await categoryRepo.findOneBy({ id: categoryId });

  if (!category) {
    throw new AppError(404, "Categoria não encontrada");
  }

  await categoryRepo.update(categoryId, {
    name,
  });

  const updatedCategory = await categoryRepo.findOneBy({ id: categoryId });

  return updatedCategory!;
};
