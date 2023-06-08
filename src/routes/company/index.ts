import { Router } from "express";
import { isStaffOrOwnerMiddleware } from "../../middlewares/isStaffOrOwner.middleware";
import { createCompanyController } from "../../controllers/company/createCompany.controller";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated.middleware";
import { readAllCompaniesController } from "../../controllers/company/readAllCompanies.controller";
import { readOneCompanyController } from "../../controllers/company/readOneCompany.controller";
import { readCompanyCategoriesController } from "../../controllers/category/readCompanyCategories.controller";
import { readCompanyUsersController } from "../../controllers/user/readCompanyUsers.controller";
import { readCompanyProductsController } from "../../controllers/product/readCompanyProducts.controller";
import { filterCompanyProductsController } from "../../controllers/product/filterCompanyProducts.controller";
import { isStaffOrAdmMiddleware } from "../../middlewares/isStaffOrAdm.middleware";
import { readCompanySalesController } from "../../controllers/sale/readCompanySales.controller";
import { updateCompanyController } from "../../controllers/company/updateCompany.controller";
import { deleteCompanyController } from "../../controllers/company/deleteCompany.controller";

const router = Router();

export const companyRoutes = () => {
  router.use(isAuthenticatedMiddleware);

  // rotas abertas de leitura de informações sobre a empresa
  router.get("/:companyId", readOneCompanyController);
  router.get("/:companyId/categories", readCompanyCategoriesController);
  router.get("/:companyId/products", readCompanyProductsController);
  router.get("/:companyId/products/filter", filterCompanyProductsController);

  // rotas de administrador
  router.use(isStaffOrAdmMiddleware);

  router.patch("/:companyId", updateCompanyController);
  router.get("/:companyId/sales", readCompanySalesController);

  // rotas de staff
  router.use(isStaffOrOwnerMiddleware);

  router.post("", createCompanyController);
  router.get("", readAllCompaniesController);
  router.delete("/:companyId", deleteCompanyController);
  router.get("/:companyId/users", readCompanyUsersController);

  return router;
};
