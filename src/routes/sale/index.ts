import { Router } from "express";
import { createSaleController } from "../../controllers/sale/createSale.controller";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated.middleware";
import { isStaffOrAdmMiddleware } from "../../middlewares/isStaffOrAdm.middleware";
import { createSaleValidationFieldsMiddleware } from "../../middlewares/createSaleValidatorFields.middleware";
import { createSaleSchema } from "../../schemas/sale.schema";
import { deleteSaleController } from "../../controllers/sale/deleteSale.controller";
import { retrieveSaleController } from "../../controllers/sale/retrieveSale.controller";

const router = Router();

export const saleRoutes = () => {
  router.use(isAuthenticatedMiddleware);

  router.post(
    "",
    createSaleValidationFieldsMiddleware(createSaleSchema),
    createSaleController
  );

  router.use(isStaffOrAdmMiddleware);

  router.get("/:saleId", retrieveSaleController);

  router.delete("/:saleId", deleteSaleController);

  return router;
};
