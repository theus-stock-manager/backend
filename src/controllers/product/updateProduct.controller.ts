import { Request, Response } from "express";
import { updateProductService } from "../../services/product/updateProduct.service";
import { IProductRequest } from "../../types/product";
import { instanceToPlain } from "class-transformer";

export const updateProductController = async (req: Request, res: Response) => {
  const {
    categoryName,
    name,
    purchasePrice,
    salePrice,
    stock,
  }: IProductRequest = req.body;
  const { productId } = req.params;

  const updatedProduct = await updateProductService(
    { categoryName, name, purchasePrice, salePrice, stock },
    productId
  );

  return res.status(200).json(instanceToPlain(updatedProduct));
};
