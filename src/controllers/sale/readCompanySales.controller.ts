import { Request, Response } from "express";
import { instanceToPlain } from "class-transformer";
import { readCompanySalesService } from "../../services/sale/readCompanySales.service";

export const readCompanySalesController = async (
  req: Request,
  res: Response
) => {
  const { page, limit } = req.query;
  const { companyId } = req.params;

  const sales = await readCompanySalesService(
    req.baseUrl,
    Number(page),
    Number(limit),
    companyId
  );

  return res.status(200).json(instanceToPlain(sales));
};
