import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { updateUserService } from "../../services/user/updateUser.service";

export const updateUserController = async (req: Request, res: Response) => {
  const { name, isAdm, password, securityAnswer, securityAsk } = req.body;
  const { userId } = req.params;

  const updatedUser = await updateUserService(
    { name, isAdm, password, securityAnswer, securityAsk },
    userId
  );

  return res.status(200).json(instanceToPlain(updatedUser));
};
