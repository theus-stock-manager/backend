import { AppDataSource } from "../../data-source";
import { Product } from "../../entities/product";

export const readCompanyProductsService = async (
  currentURL: string,
  page: number,
  limit: number,
  companyId: string
) => {
  !page && (page = 1);
  !limit && (limit = 5);

  page = Number(page);
  limit = Number(limit);

  const productRepo = AppDataSource.getRepository(Product);
  const count = await productRepo.count({
    where: { company: { id: companyId } },
  });

  page < 1 || (page * limit > count && (page = 1));
  limit < 1 && (limit = 5);

  const skip = (page - 1) * limit;

  const products = await productRepo.find({
    skip,
    take: limit,
    order: { createdAt: "desc" },
    relations: { category: true },
    where: { company: { id: companyId } },
  });

  const next =
    page * limit <= count
      ? `${currentURL}/${companyId}/products?pages=${page + 1}&limit=${limit}`
      : null;

  const previous =
    page <= 1
      ? null
      : `${currentURL}/${companyId}/products?page=${page - 1}&limit=${limit}`;

  const response = {
    page,
    count,
    next,
    previous,
    limit,
    results: products,
  };

  return response;
};
