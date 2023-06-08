import { Router } from "express";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated.middleware";
import { isStaffOrAdmMiddleware } from "../../middlewares/isStaffOrAdm.middleware";
import { createProductController } from "../../controllers/product/createProduct.controller";
import { createProductValidationFieldsMiddleware } from "../../middlewares/createProductValidationFields.middleware";
import {
  createProductSchema,
  updateProductSchema,
} from "../../schemas/product.schema";
// import { readAllProductsController } from "../../controllers/product/readAllProducts.controller";
import { updateProductValidationFieldsMiddleware } from "../../middlewares/updateProductValidationFields.middleware";
import { updateProductController } from "../../controllers/product/updateProduct.controller";
import { deleteProductController } from "../../controllers/product/deleteProduct.controller";
// import { filterProductsController } from "../../controllers/product/filterProducts.controller";

const router = Router();

export const productRoutes = () => {
  router.use(isAuthenticatedMiddleware, isStaffOrAdmMiddleware);

  router.post(
    "",
    createProductValidationFieldsMiddleware(createProductSchema),
    createProductController
  );

  router.patch(
    "/:productId",
    updateProductValidationFieldsMiddleware(updateProductSchema),
    updateProductController
  );

  router.delete("/:productId", deleteProductController);

  return router;
};
