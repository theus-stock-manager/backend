import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Category } from "../../entities/category";
import { Product } from "../../entities/product";
import { IProductRequest } from "../../types/product";
import { Company } from "../../entities/company";

export const createProductService = async ({
  categoryName,
  name,
  purchasePrice,
  salePrice,
  stock,
  companyId,
}: IProductRequest) => {
  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);
  const companyRepo = AppDataSource.getRepository(Company);

  const company = await companyRepo.findOneBy({
    id: companyId,
  });

  if (!company) {
    throw new AppError(404, "empresa não localizada no banco de dados");
  }

  name = name!.toLowerCase();
  categoryName && (categoryName = categoryName.toLowerCase());

  let category =
    categoryName && (await categoryRepo.findOneBy({ name: categoryName }));

  if (categoryName && !category) {
    throw new AppError(404, "categoria fornecida não encontrada");
  }

  if (!category) {
    category = undefined;
  }

  const productAlreadyExists = await productRepo.findOne({
    where: {
      name,
      company: { id: company.id },
    },
    relations: {
      company: true,
    },
  });

  if (productAlreadyExists) {
    throw new AppError(400, "Este produto já consta na base de dados");
  }

  const newProduct = productRepo.create({
    category,
    name,
    purchasePrice,
    salePrice,
    stock,
    company,
  });

  await productRepo.save(newProduct);

  const product = await productRepo.findOne({
    where: { name },
    relations: {
      category: true,
      company: true,
    },
  });

  return product;
};
