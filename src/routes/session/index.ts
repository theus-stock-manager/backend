import { Router } from "express";
import { userLoginController } from "../../controllers/session/userLogin.controller";
import { retrieveSecurityAskController } from "../../controllers/session/retrieveSecurityAsk.controller";
import { recoverPasswordValidationFieldsMiddleware } from "../../middlewares/recoverPasswordValidationFields.middleware";
import { recoverPasswordSchema } from "../../schemas/user.schema";
import { recoverPasswordController } from "../../controllers/session/recoverPassword.controller";

const router = Router();

export const sessionRoutes = (): Router => {
  router.post("/login", userLoginController);
  router.get("/security-ask/:userName", retrieveSecurityAskController);
  router.post(
    "/recover-password/:userName",
    recoverPasswordValidationFieldsMiddleware(recoverPasswordSchema),
    recoverPasswordController
  );

  return router;
};
