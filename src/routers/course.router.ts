import { Router } from "express";
import middlewares from "../middlewares";
import { courseCreateSchema } from "../schemas";
import { courseControllers } from "../controllers";

const courseRouter: Router = Router();

courseRouter.post(
  "",
  middlewares.validateBody(courseCreateSchema),
  middlewares.verifyToken,
  middlewares.validateAdmin,
  courseControllers.createCourse
);

courseRouter.get("", courseControllers.readCourse);

courseRouter.get(
  "/:id/users",
  middlewares.verifyToken,
  middlewares.validateAdmin,
  courseControllers.readCourseUser
);

courseRouter.use("/:courseId/users/:userId", middlewares.validateUserCourse);

courseRouter.post(
  "/:courseId/users/:userId",
  middlewares.verifyToken,
  middlewares.validateAdmin,
  courseControllers.addUserToCourse
);

courseRouter.delete(
  "/:courseId/users/:userId",
  middlewares.verifyToken,
  middlewares.validateAdmin,
  courseControllers.deleteUserFromCourse
);

export default courseRouter;
