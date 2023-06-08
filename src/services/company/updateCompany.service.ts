import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Company } from "../../entities/company";
import { ICompanyUpdateRequest } from "../../types/company";

export const updateCompanyService = async (
  { image, name }: ICompanyUpdateRequest,
  companyId: string
) => {
  if (!image && !name) {
    throw new AppError(400, "nada para alterar");
  }

  name && (name = name.toLowerCase());

  const companyRepo = AppDataSource.getRepository(Company);
  const company = await companyRepo.findOneBy({ id: companyId });

  if (!company) {
    throw new AppError(404, "empresa não encontrada");
  }

  await companyRepo.update(companyId, {
    name: name || company.name,
    image: image || company.image,
  });

  const updatedCompany = await companyRepo.findOneBy({ id: companyId });

  return updatedCompany!;
};
