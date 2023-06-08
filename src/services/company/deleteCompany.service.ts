import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Company } from "../../entities/company";

export const deleteCompanyservice = async (companyId: string) => {
  if (!companyId) {
    throw new AppError(400, "faltou o id da empresa nos parâmetros");
  }

  const companyRepo = AppDataSource.getRepository(Company);
  const company = await companyRepo.findOneBy({ id: companyId });

  if (!company) {
    throw new AppError(404, "empresa não encontrada");
  }

  const deletedCompany = await companyRepo.delete(companyId);

  return deletedCompany;
};
