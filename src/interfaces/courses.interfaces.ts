import { z } from "zod";
import { QueryResult } from "pg";
import { courseSchema, courseCreateSchema, courseReadSchema } from "../schemas";

type Course = z.infer<typeof courseSchema>;
type CoursesCreate = z.infer<typeof courseCreateSchema>;
type CourseRead = z.infer<typeof courseReadSchema>;
type CourseResult = QueryResult<Course>;

export { Course, CoursesCreate, CourseResult, CourseRead };
