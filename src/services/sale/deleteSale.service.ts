import { AppDataSource } from "../../data-source";
import { Sale } from "../../entities/sale";
import { Product } from "../../entities/product";
import { AppError } from "../../errors";

export const deleteSaleService = async (saleId: string) => {
  if (!saleId) {
    throw new AppError(400, "id da venda não foi passado nos parâmetros");
  }

  const saleRepo = AppDataSource.getRepository(Sale);
  const productRepo = AppDataSource.getRepository(Product);

  const sale = await saleRepo.findOne({
    relations: { user: true, products: true },
    where: { id: saleId },
  });

  if (!sale) {
    throw new AppError(404, "venda não encontrada");
  }

  for (let i = 0; i < sale.products.length; i++) {
    const sProd = sale.products[i];

    await productRepo.update(sProd.product.id, {
      stock: sProd.product.stock + sProd.quantity,
    });
  }

  const deletedSale = await saleRepo.delete(saleId);

  return deletedSale;
};
