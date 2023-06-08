import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors";
import { Sale } from "../../entities/sale";
import { User } from "../../entities/user";
import { Product } from "../../entities/product";
import { SaleProduct } from "../../entities/sale-product";
import { ISaleRequest } from "../../types/sale";
import { Company } from "../../entities/company";

export const createSaleService = async (
  { description, products, companyId }: ISaleRequest,
  userId: string
) => {
  const userRepo = AppDataSource.getRepository(User);
  const saleRepo = AppDataSource.getRepository(Sale);
  const productRepo = AppDataSource.getRepository(Product);
  const saleProductRepo = AppDataSource.getRepository(SaleProduct);
  const companyRepo = AppDataSource.getRepository(Company);

  const user = await userRepo.findOneBy({ id: userId });

  if (!user) {
    throw new AppError(404, "usuário não encontrado!");
  }

  const company = await companyRepo.findOneBy({
    id: companyId,
  });

  if (!company) {
    throw new AppError(404, "empresa não encontrada");
  }

  const newSale = saleRepo.create({
    user,
    description,
    company,
  });

  await saleRepo.save(newSale);

  for (let i = 0; i < products.length; i++) {
    const prod = products[i];

    const product = await productRepo.findOneBy({ id: prod.productId });

    if (!product) {
      await saleRepo.delete(newSale.id);

      throw new AppError(
        404,
        "Venda não pôde ser criada pois um dos produtos não existe no banco de dados"
      );
    }

    if (prod.quantity > product.stock) {
      await saleRepo.delete(newSale.id);

      throw new AppError(
        400,
        "Venda não pôde ser criada pois não há estoque suficiente para suprir uma das quantidades pedidas."
      );
    }

    const newSaleProduct = saleProductRepo.create({
      product,
      sale: newSale,
      quantity: Math.trunc(prod.quantity),
    });

    await saleProductRepo.save(newSaleProduct);
  }

  for (let i = 0; i < products.length; i++) {
    const prod = products[i];

    const product = await productRepo.findOneBy({ id: prod.productId });

    if (!product) {
      await saleRepo.delete(newSale.id);

      throw new AppError(
        404,
        "Venda não pôde ser criada pois um dos produtos não existe no banco de dados"
      );
    }

    await productRepo.update(product.id, {
      stock: product.stock - Math.trunc(prod.quantity),
    });
  }

  const sale = await saleRepo.findOne({
    relations: { user: true, products: true },
    where: { id: newSale.id },
  });

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
