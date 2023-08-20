import { Request, Response } from "express";
import { Course, CourseRead } from "../interfaces";
import { courseServices } from "../services";

const createCourse = async (req: Request, res: Response): Promise<Response> => {
  const course: Course = await courseServices.createCourse(req.body);
  return res.status(201).json(course);
};

const readCourse = async (req: Request, res: Response): Promise<Response> => {
  const courses: CourseRead = await courseServices.readCourse();
  return res.status(200).json(courses);
};

const readCourseUser = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const courseUsers = await courseServices.readCourseUsers(req.params.id);
  return res.status(200).json(courseUsers);
};

const addUserToCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;

  await courseServices.addUserToCourse(userId, courseId);

  return res
    .status(201)
    .json({ message: "User successfully vinculed to course" });
};

const deleteUserFromCourse = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { userId, courseId } = req.params;
  await courseServices.deleteUserFromCourse(userId, courseId);
  return res.status(204).json();
};

export default {
  createCourse,
  readCourse,
  readCourseUser,
  addUserToCourse,
  deleteUserFromCourse,
};
