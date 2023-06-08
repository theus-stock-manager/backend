import { AppDataSource } from "../../data-source";
import { User } from "../../entities/user";

export const readAllUsersService = async (
  currentURL: string,
  page: number,
  limit: number
) => {
  !page && (page = 1);
  !limit && (limit = 5);

  page = Number(page);
  limit = Number(limit);

  const userRepo = AppDataSource.getRepository(User);
  const count = await userRepo.count();

  page < 1 || (page * limit > count && (page = 1));
  limit < 1 && (limit = 5);

  const skip = (page - 1) * limit;

  const users = await userRepo.find({
    skip,
    take: limit,
    order: { createdAt: "desc" },
    relations: { company: true },
  });

  const next =
    page * limit <= count
      ? `${currentURL}?page=${page + 1}&limit=${limit}`
      : null;

  const previous =
    page <= 1 ? null : `${currentURL}?page=${page - 1}&limit=${limit}`;

  const response = {
    page,
    count,
    next,
    previous,
    limit,
    results: users,
  };

  return response;
};
