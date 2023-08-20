import { Router } from "express";
import middlewares from "../middlewares";
import { userCreateSchema } from "../schemas";
import { userControllers } from "../controllers";

const userRouter: Router = Router();

userRouter.post(
  "",
  middlewares.validateBody(userCreateSchema),
  middlewares.validateUserEmailExists,
  userControllers.createUser
);

userRouter.get(
  "",
  middlewares.verifyToken,
  middlewares.validateAdmin,
  userControllers.readUser
);

userRouter.get(
  "/:id/courses",
  middlewares.verifyToken,
  middlewares.validateAdmin,
  userControllers.readUserCourses
);

export default userRouter;
