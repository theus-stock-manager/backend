import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Product } from "../../entities/product";
import { Category } from "../../entities/category";
import { IFilterProduct } from "../../types/product";
import { Between, LessThanOrEqual, Like, MoreThanOrEqual } from "typeorm";
import { Company } from "../../entities/company";

export const filterCompanyProductsService = async (
  { categoryName, name, stockLess, stockMore }: IFilterProduct,
  currentURL: string,
  page: number,
  limit: number,
  companyId: string
) => {
  if (!categoryName && !name && !stockLess && !stockMore) {
    throw new AppError(400, "Nenhum dado para filtrar");
  }

  categoryName && (categoryName = categoryName.toLowerCase());
  name && (name = name.toLowerCase());
  !page && (page = 1);
  !limit && (limit = 5);

  page = Number(page);
  limit = Number(limit);

  const productRepo = AppDataSource.getRepository(Product);
  const categoryRepo = AppDataSource.getRepository(Category);
  const companyRepo = AppDataSource.getRepository(Company);

  const company = await companyRepo.findOneBy({
    id: companyId,
  });

  if (!company) {
    throw new AppError(404, "empresa não encontrada");
  }

  let category = undefined;

  categoryName && (category = categoryRepo.findOneBy({ name: categoryName }));

  if (categoryName && !category) {
    throw new AppError(
      404,
      "filtro por categoria inválido pois essa categoria não consta no banco de dados"
    );
  }

  const count = await productRepo.count({
    relations: { category: true, company: true },
    where: {
      company: { id: company.id },
      name: name ? Like(`%${name}%`) : undefined,
      stock:
        stockLess && stockMore
          ? Between(stockLess + 1, stockMore - 1)
          : stockLess && !stockMore
          ? LessThanOrEqual(stockLess)
          : stockMore && !stockLess
          ? MoreThanOrEqual(stockMore)
          : undefined,
      category: {
        name: categoryName ? Like(`%${categoryName}%`) : undefined,
      },
    },
  });

  page < 1 || (page * limit > count && (page = 1));
  limit < 1 && (limit = 5);

  const skip = (page - 1) * limit;

  const products = await productRepo.find({
    skip,
    take: limit,
    order: { createdAt: "desc" },
    relations: { category: true, company: true },
    where: {
      company: { id: company.id },
      name: name ? Like(`%${name}%`) : undefined,
      stock:
        stockLess && stockMore
          ? Between(stockLess + 1, stockMore - 1)
          : stockLess && !stockMore
          ? LessThanOrEqual(stockLess)
          : stockMore && !stockLess
          ? MoreThanOrEqual(stockMore)
          : undefined,
      category: {
        name: categoryName ? Like(`%${categoryName}%`) : undefined,
      },
    },
  });

  const next =
    page * limit <= count
      ? `${currentURL}?pages=${page + 1}&limit=${limit}`
      : null;

  const previous =
    page <= 1 ? null : `${currentURL}?page=${page - 1}&limit=${limit}`;

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
