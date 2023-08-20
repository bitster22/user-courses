import format from "pg-format";
import { UserCreate, UserRead, UserResult, UserReturn } from "../interfaces";
import { client } from "../database";
import { hash } from "bcryptjs";
import { userReadSchema, userReturnSchema } from "../schemas";
import { AppError } from "../errors";

const createUser = async (payload: UserCreate): Promise<UserReturn> => {
  payload.password = await hash(payload.password, 10);

  const queryFormat: string = format(
    'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
    Object.keys(payload),
    Object.values(payload)
  );
  const query: UserResult = await client.query(queryFormat);

  return userReturnSchema.parse(query.rows[0]);
};

const readUser = async (): Promise<UserRead> => {
  const query: UserResult = await client.query('SELECT * FROM "users";');
  return userReadSchema.parse(query.rows);
};

const readUserCourses = async (userId: string) => {
  const queryString: string = `
        SELECT
           "c"."id" "courseId",
           "c"."name" "courseName",
           "c"."description" "courseDescription",
           "uc"."active" "userActiveInCourse",
           "u"."id" "userId",
           "u"."name" "userName"
        FROM "users" "u"
        JOIN "userCourses" "uc"
            ON "u"."id" = "uc"."userId"
        JOIN "courses" "c"
            ON "c"."id" = "uc"."courseId"
        WHERE "u"."id" = $1;
    `;
  const queryResult = await client.query(queryString, [userId]);

  if (!queryResult.rowCount) {
    throw new AppError("No course found", 404);
  }

  return queryResult.rows;
};

export default { createUser, readUser, readUserCourses };
