import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { User } from "../../entities/user";

export const filterUsers = async (partialName: string) => {
  if (partialName.length < 4) {
    throw new AppError(400, "no mínimo 4 letras");
  }
  const userRepo = AppDataSource.getRepository(User);

  const users = await userRepo.find();

  const filteredUsers = users.filter((usr) =>
    usr.name.toLowerCase().includes(partialName.toLowerCase())
  );

  return {
    count: filteredUsers.length,
    results: filteredUsers,
  };
};
