import handleErrors from "./handleErrors";
import validateBody from "./validateBody.middleware";
import validateUserEmailExists from "./validateUserEmailExists.middleware";
import validateAdmin from "./validateAdmin.middleware";
import verifyToken from "./verifyToken.middleware";
import validateUserCourse from "./validateUserCourse.middlewares";

export default {
  handleErrors,
  validateBody,
  validateUserEmailExists,
  validateAdmin,
  verifyToken,
  validateUserCourse,
};
