import { instanceToPlain } from "class-transformer";
import { Request, Response } from "express";
import { filterUsersService } from "../../services/user/filterUsers.service";

export const filterUsersController = async (req: Request, res: Response) => {
  const { partialName } = req.query;

  const filteredUsers = await filterUsersService(partialName!.toString());

  return res.status(200).json(instanceToPlain(filteredUsers));
};
