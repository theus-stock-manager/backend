import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Category } from "../../entities/category";
import { Product } from "../../entities/product";
import { IProductRequest } from "../../types/product";

export const updateProductService = async (
  { categoryName, name, purchasePrice, salePrice, stock }: IProductRequest,
  id: string
) => {
  name && (name = name.toLowerCase());
  categoryName && (categoryName = categoryName.toLowerCase());

  const categoryRepo = AppDataSource.getRepository(Category);
  const productRepo = AppDataSource.getRepository(Product);
  const product = await productRepo.findOne({
    where: { id },
    relations: { category: true },
  });

  if (!product) {
    throw new AppError(404, "produto não encontrado");
  }

  let category;

  if (typeof categoryName === "string") {
    category = await categoryRepo.findOneBy({ name: categoryName });
  } else if (categoryName === undefined) {
    category = product.category;
  } else if (categoryName === null) {
    category = categoryName;
  }

  if (typeof categoryName === "string" && !category) {
    throw new AppError(404, "categoria fornecida não encontrada");
  }

  await productRepo.update(id, {
    category,
    name: name || product.name,
    purchasePrice: purchasePrice || product.purchasePrice,
    salePrice: salePrice || product.salePrice,
    stock: stock || product.stock,
  });

  const updatedProduct = await productRepo.findOne({
    where: { id },
    relations: { category: true },
  });

  return updatedProduct!;
};
