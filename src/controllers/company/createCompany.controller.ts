import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { createCompanyservice } from "../../services/company/createCompany.service";
import { ICompanyRequest } from "../../types/company";

export const createCompanyController = async (req: Request, res: Response) => {
  const { image, name }: ICompanyRequest = req.body;

  const newCompany = await createCompanyservice({ name, image });

  return res.status(201).json(instanceToPlain(newCompany));
};
