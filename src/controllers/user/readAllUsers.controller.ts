import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { readAllUsersService } from "../../services/user/readAllUsers.service";

export const readAllUsersController = async (req: Request, res: Response) => {
  const { page, limit } = req.query;

  const users = await readAllUsersService(
    req.baseUrl,
    Number(page),
    Number(limit)
  );

  return res.status(200).json(instanceToPlain(users));
};
