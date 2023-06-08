import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Category } from "../../entities/category";
import { ICategory, ICategoryRequest } from "../../types/category";
import { Company } from "../../entities/company";

export const createCategoryService = async (
  { name, companyId }: ICategoryRequest,
  userCompanyId: string
): Promise<ICategory> => {
  if (!name) {
    throw new AppError(400, "O campo nome é obrigatório");
  }

  name = name.toLowerCase();

  const categoryRepo = AppDataSource.getRepository(Category);
  const companyRepo = AppDataSource.getRepository(Company);
  const categoryAlreadyExists = await categoryRepo.findOneBy({ name });
  const company = await companyRepo.findOneBy({
    id: companyId ? companyId : userCompanyId,
  });

  if (categoryAlreadyExists) {
    throw new AppError(400, "Esta categoria já existe");
  }

  if (!company) {
    throw new AppError(404, "empresa não encontrada");
  }

  const newCategory = categoryRepo.create({
    name,
    company: company,
  });

  await categoryRepo.save(newCategory);

  return newCategory;
};
