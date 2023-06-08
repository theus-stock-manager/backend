import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { readOneCompanyService } from "../../services/company/readOneCompany.service";

export const readOneCompanyController = async (req: Request, res: Response) => {
  const { companyId } = req.params;

  const company = await readOneCompanyService(companyId);

  return res.status(200).json(instanceToPlain(company));
};
