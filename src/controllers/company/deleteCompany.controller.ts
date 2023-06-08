import { Request, Response } from "express";
import { deleteCompanyservice } from "../../services/company/deleteCompany.service";

export const deleteCompanyController = async (req: Request, res: Response) => {
  const { companyId } = req.params;

  const _ = await deleteCompanyservice(companyId);

  return res.status(204).json({});
};
