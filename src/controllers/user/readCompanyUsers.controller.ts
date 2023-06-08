import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { readCompanyUsersService } from "../../services/user/readCompanyUsers.service";

export const readCompanyUsersController = async (
  req: Request,
  res: Response
) => {
  const { companyId } = req.params;

  const companyUsers = await readCompanyUsersService(companyId);

  return res.status(200).json(instanceToPlain(companyUsers));
};
