import { Router } from "express";
import { createUserController } from "../../controllers/user/createUser.controller";
import { deleteUserController } from "../../controllers/user/deleteUser.controller";
import { readAllUsersController } from "../../controllers/user/readAllUsers.controller";
import { retrieveUserController } from "../../controllers/user/retrieveUser.controller";
import { updateUserController } from "../../controllers/user/updateUser.controller";

import { createUserValidationFieldsMiddleware } from "../../middlewares/createUserValidationFields.middleware";
import { isAuthenticatedMiddleware } from "../../middlewares/isAuthenticated.middleware";
import { isStaffOrOwnerMiddleware } from "../../middlewares/isStaffOrOwner.middleware";
import { updateUserValidationFieldsMiddleware } from "../../middlewares/updateUserValidationFields.middleware";

import { createUserSchema, updateUserSchema } from "../../schemas/user.schema";

const router = Router();

export const userRoutes = (): Router => {
  router.use(isAuthenticatedMiddleware);

  router.post(
    "",
    isStaffOrOwnerMiddleware,
    createUserValidationFieldsMiddleware(createUserSchema),
    createUserController
  );

  router.get("", isStaffOrOwnerMiddleware, readAllUsersController);

  router.get("/:userId", isStaffOrOwnerMiddleware, retrieveUserController);

  router.patch(
    "/:userId",
    isStaffOrOwnerMiddleware,
    updateUserValidationFieldsMiddleware(updateUserSchema),
    updateUserController
  );

  router.delete("/:userId", isStaffOrOwnerMiddleware, deleteUserController);

  return router;
};
