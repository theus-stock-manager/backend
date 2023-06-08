import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { createSaleService } from "../../services/sale/createSale.service";
import { ISaleRequest } from "../../types/sale";

export const createSaleController = async (req: Request, res: Response) => {
  const data: ISaleRequest = req.body;
  const { userId } = req;

  const sale = await createSaleService(data, userId!);

  return res.status(200).json(instanceToPlain(sale));
};
