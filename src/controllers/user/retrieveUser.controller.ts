import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { retrieveUserService } from "../../services/user/retrieveUser.service";

export const retrieveUserController = async (req: Request, res: Response) => {
  const { userId } = req.params;

  const user = await retrieveUserService(userId);

  return res.status(200).json(instanceToPlain(user));
};
