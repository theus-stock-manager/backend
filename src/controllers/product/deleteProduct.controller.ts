import { Request, Response } from "express";
import { deleteProductService } from "../../services/product/deleteProduct.service";

export const deleteProductController = async (req: Request, res: Response) => {
  const { productId } = req.params;

  const _ = await deleteProductService(productId);

  return res.status(204).json({});
};
