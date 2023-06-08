import { Request, Response } from "express";
import { retrieveSaleService } from "../../services/sale/retrieveSale.Service";
import { instanceToPlain } from "class-transformer";

export const retrieveSaleController = async (req: Request, res: Response) => {
  const { saleId } = req.params;

  const sale = await retrieveSaleService(saleId);

  return res.status(200).json(instanceToPlain(sale));
};
