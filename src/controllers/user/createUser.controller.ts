import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { IUserRequest } from "../../types/user";
import { createUserService } from "../../services/user/createUser.service";

export const createUserController = async (req: Request, res: Response) => {
  const {
    isAdm,
    name,
    password,
    securityAnswer,
    securityAsk,
    companyId,
  }: IUserRequest = req.body;

  const createdUser = await createUserService({
    isAdm,
    name,
    password,
    securityAnswer,
    securityAsk,
    companyId,
  });

  return res.status(201).json(instanceToPlain(createdUser));
};
