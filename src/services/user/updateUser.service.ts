import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { User } from "../../entities/user";
import { IUserRequest } from "../../types/user";
import { hashSync } from "bcrypt";

export const updateUserService = async (
  { isAdm, name, password, securityAnswer, securityAsk }: IUserRequest,
  id: string
) => {
  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ id });

  if (!user) {
    throw new AppError(404, "Usuário não encontrado");
  }

  const hashedPassword = password ? hashSync(password!, 10) : user.password;

  await userRepo.update(id, {
    name: name || user.name,
    isAdm: isAdm || user.isAdm,
    securityAsk: securityAsk || user.securityAsk,
    securityAnswer: securityAnswer || user.securityAnswer,
    password: password ? hashedPassword : user.password,
  });

  const updatedUser = await userRepo.findOneBy({ id });

  return updatedUser;
};
