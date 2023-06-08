import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { readAllCompaniesService } from "../../services/company/readAllCompanies.service";

export const readAllCompaniesController = async (
  req: Request,
  res: Response
) => {
  const companies = await readAllCompaniesService();

  return res.status(200).json(instanceToPlain(companies));
};
