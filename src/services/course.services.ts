import format from "pg-format";
import { client } from "../database";
import {
  Course,
  CourseRead,
  CourseResult,
  CoursesCreate,
} from "../interfaces/courses.interfaces";
import { AppError } from "../errors";

const createCourse = async (payload: CoursesCreate): Promise<Course> => {
  const queryFormat: string = format(
    'INSERT INTO "courses" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );
  const query: CourseResult = await client.query(queryFormat);

  return query.rows[0];
};

const readCourse = async (): Promise<CourseRead> => {
  const query: CourseResult = await client.query('SELECT * FROM "courses";');
  return query.rows;
};

const readCourseUsers = async (courseId: string) => {
  const queryString: string = `
    SELECT
        "u"."id" "userId",
        "u"."name" "userName",
        "c"."id" "courseId",
        "c"."name" "courseName",
        "c"."description" "courseDescription",
        "uc"."active" "userActiveInCourse"
    FROM "courses" "c"
    JOIN "userCourses" "uc"
        ON "c"."id" = "uc"."courseId"
    JOIN "users" "u"
        ON "u"."id" = "uc"."userId"
    WHERE "c"."id" = $1;
    `;

  const queryResult = await client.query(queryString, [courseId]);

  if (!queryResult.rowCount) {
    throw new AppError("No user found", 404);
  }

  return queryResult.rows;
};

const addUserToCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const queryString: string = `
        INSERT INTO "userCourses"
            ("active", "userId", "courseId")
        VALUES (TRUE, $1, $2)
        RETURNING *;
    `;

  await client.query(queryString, [userId, courseId]);
};

const deleteUserFromCourse = async (
  userId: string,
  courseId: string
): Promise<void> => {
  const queryUpdateString = `
    UPDATE "userCourses"
    SET "active" = FALSE
    WHERE "userId" = $1
    AND "courseId" = $2;
    `;
  await client.query(queryUpdateString, [userId, courseId]);

  const queryDeleteString = `
        DELETE FROM "userCourses"
        WHERE "userId" = $1
        AND "courseId" = $2;
    `;
  await client.query(queryDeleteString, [userId, courseId]);
};

export default {
  createCourse,
  readCourse,
  readCourseUsers,
  addUserToCourse,
  deleteUserFromCourse,
};
