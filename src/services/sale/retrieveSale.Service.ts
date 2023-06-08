import { AppDataSource } from "../../data-source";
import { Sale } from "../../entities/sale";
import { AppError } from "../../errors";

export const retrieveSaleService = async (saleId: string) => {
  if (!saleId) {
    throw new AppError(400, "id da venda não foi passado nos parâmetros");
  }

  const saleRepo = AppDataSource.getRepository(Sale);

  const sale = await saleRepo.findOne({
    relations: { user: true, products: true },
    where: { id: saleId },
  });

  if (!sale) {
    throw new AppError(404, "venda não encontrada");
  }

  const response = {
    ...sale,
    products: [
      ...sale!.products.map((sProd) => {
        return {
          quantity: sProd.quantity,
          ...sProd.product,
        };
      }),
    ],
  };

  return response;
};
