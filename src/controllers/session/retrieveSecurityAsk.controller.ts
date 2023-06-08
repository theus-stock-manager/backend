import { Request, Response } from "express";
import { retrieveSecurityAskService } from "../../services/session/retrieveSecurityAsk.service";

export const retrieveSecurityAskController = async (
  req: Request,
  res: Response
) => {
  const { userName } = req.params;

  const securityAsk = await retrieveSecurityAskService(userName);

  return res.status(200).json(securityAsk);
};
