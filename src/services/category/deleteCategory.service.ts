import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Category } from "../../entities/category";

export const deleteCategoryService = async (categoryId: string) => {
  if (!categoryId) {
    throw new AppError(
      400,
      "Id da categoria não informado nos parâmetros da requisição"
    );
  }

  const categoryRepo = AppDataSource.getRepository(Category);
  const categoryExists = categoryRepo.findOneBy({ id: categoryId });

  if (!categoryExists) {
    throw new AppError(404, "Categoria não encontrada");
  }

  const deletedCategory = await categoryRepo.delete(categoryId);

  return deletedCategory;
};
