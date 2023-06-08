import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { filterUsersService } from "../../services/user/filterUsers.service";

export const filterUsersController = async (req: Request, res: Response) => {
  const { partialName } = req.body;

  const filteredUsers = await filterUsersService(partialName);

  return res.status(200).json(instanceToPlain(filteredUsers));
};
