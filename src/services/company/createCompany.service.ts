import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Company } from "../../entities/company";
import { ICompanyRequest } from "../../types/company";

export const createCompanyservice = async ({
  image,
  name,
}: ICompanyRequest) => {
  if (!name) {
    throw new AppError(400, "name: campo obrigatório");
  }

  name = name.toLowerCase();

  const companyRepo = AppDataSource.getRepository(Company);

  const companyAlreadyExists = await companyRepo.findOneBy({ name });

  if (companyAlreadyExists) {
    throw new AppError(400, "empresa já existe no banco de dados");
  }

  const newCompany = companyRepo.create({
    image,
    name,
  });

  await companyRepo.save(newCompany);

  return newCompany;
};
