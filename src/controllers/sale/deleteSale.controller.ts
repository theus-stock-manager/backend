import { Request, Response } from "express";
import { deleteSaleService } from "../../services/sale/deleteSale.service";

export const deleteSaleController = async (req: Request, res: Response) => {
  const { saleId } = req.params;

  const _ = await deleteSaleService(saleId);

  return res.status(204).json({});
};
