import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { updateCompanyService } from "../../services/company/updateCompany.service";
import { ICompanyUpdateRequest } from "../../types/company";

export const updateCompanyController = async (req: Request, res: Response) => {
  const { image, name }: ICompanyUpdateRequest = req.body;
  const { companyId } = req.params;

  const updatedCompany = await updateCompanyService({ image, name }, companyId);

  return res.status(200).json(instanceToPlain(updatedCompany));
};
