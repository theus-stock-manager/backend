import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { userLoginService } from "../../services/session/userLogin.service";

export const userLoginController = async (req: Request, res: Response) => {
  const { name, password } = req.body;

  const loggedUser = await userLoginService({ name, password });

  return res.status(200).json(instanceToPlain(loggedUser));
};
