import { AppDataSource } from "../../data-source";
import { Company } from "../../entities/company";

export const readAllCompaniesService = async () => {
  const companyRepo = AppDataSource.getRepository(Company);

  const companies = await companyRepo.find();
  const count = await companyRepo.count();

  return {
    count,
    results: companies,
  };
};
