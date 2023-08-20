import { Request, Response, NextFunction } from "express";
import { CourseResult, UserResult } from "../interfaces";
import { client } from "../database";
import { AppError } from "../errors";

const validateUserCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { userId, courseId } = req.params;

  const queryUser: UserResult = await client.query(
    'SELECT * FROM "users" WHERE "id" = $1',
    [userId]
  );

  const queryCourse: CourseResult = await client.query(
    'SELECT * FROM "courses" WHERE "id" = $1',
    [courseId]
  );

  if (queryUser.rowCount === 0 || queryCourse.rowCount === 0) {
    throw new AppError("User/course not found", 404);
  }

  return next();
};

export default validateUserCourse;
