import { Request, Response } from "express";
import { UserRead, UserReturn } from "../interfaces";
import { userServices } from "../services";

const createUser = async (req: Request, res: Response): Promise<Response> => {
  const user: UserReturn = await userServices.createUser(req.body);
  return res.status(201).json(user);
};

const readUser = async (req: Request, res: Response): Promise<Response> => {
  const users: UserRead = await userServices.readUser();
  return res.status(200).json(users);
};

const readUserCourses = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const userCourses = await userServices.readUserCourses(req.params.id);
  return res.status(200).json(userCourses);
};

export default { createUser, readUser, readUserCourses };
