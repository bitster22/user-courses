import { QueryResult } from "pg";
import { z } from "zod";
import {
  userSchema,
  userCreateSchema,
  userReadSchema,
  userReturnSchema,
} from "../schemas";

type User = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof userCreateSchema>;
type UserRead = z.infer<typeof userReadSchema>;
type UserReturn = z.infer<typeof userReturnSchema>;
type UserResult = QueryResult<User>;

export { User, UserCreate, UserRead, UserReturn, UserResult };
