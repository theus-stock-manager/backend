import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Product } from "../../entities/product";

export const deleteProductService = async (id: string) => {
  if (!id) {
    throw new AppError(
      400,
      "id do produto nos parâmetros de rota é obrigatório"
    );
  }

  const productRepo = AppDataSource.getRepository(Product);
  const product = await productRepo.findOneBy({ id });

  if (!product) {
    throw new AppError(404, "produto não econtrado");
  }

  const deletedProduct = await productRepo.delete(id);

  return deletedProduct;
};
