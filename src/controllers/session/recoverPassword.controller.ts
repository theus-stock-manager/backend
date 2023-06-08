import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { recoverPasswordService } from "../../services/session/recoverPassword.service";
import { IRecoverPasswordRequest } from "../../types/user";

export const recoverPasswordController = async (
  req: Request,
  res: Response
) => {
  const { newPassword, securityAnswer }: IRecoverPasswordRequest = req.body;
  const { userName } = req.params;

  const updatedUser = await recoverPasswordService(
    { newPassword, securityAnswer },
    userName
  );

  return res.status(200).json(instanceToPlain(updatedUser));
};
