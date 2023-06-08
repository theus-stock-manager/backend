import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { User } from "../../entities/user";
import { hashSync } from "bcrypt";
import { IRecoverPasswordRequest } from "../../types/user";

export const recoverPasswordService = async (
  { newPassword, securityAnswer }: IRecoverPasswordRequest,
  name: string
) => {
  securityAnswer = securityAnswer.toLowerCase().trim();
  const hashedPassword = hashSync(newPassword, 10);

  const userRepo = AppDataSource.getRepository(User);
  const user = await userRepo.findOneBy({ name });

  if (!user || !user.isActive) {
    throw new AppError(
      404,
      "usuário não encontrado ou inativo. Favor entrar em contato com a manutenção."
    );
  }

  const rightAnswer =
    user.securityAnswer.toLowerCase().trim() === securityAnswer;

  if (!rightAnswer) {
    await userRepo.update(user.id, { isActive: false });

    throw new AppError(
      401,
      "Resposta errada. Usuário bloqueado. Favor entrar em contato com a manutenção da aplicação para solicitar o desbloqueio."
    );
  }

  await userRepo.update(user.id, {
    password: hashedPassword,
  });

  const updatedUser = await userRepo.findOneBy({ id: user.id });

  return updatedUser!;
};
