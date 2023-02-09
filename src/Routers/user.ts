import express, { Response } from "express";
import { body } from "express-validator";
import { ServiceRequest } from "../interfaces";
import { UserSchema } from "../models";
import validatorsMiddleware from "../utils/validationMiddleware";

export const userRouter = express.Router();

userRouter.get("/", async (_req: ServiceRequest, res: Response) => {
  try {
    const users = await UserSchema.findAll();
    res.send(users);
  } catch (error) {
    console.log(error);
    res.sendStatus(Number(error) || 500);
  }
});
userRouter.post(
  "/",
  body("name").exists().isString(),
  validatorsMiddleware,
  async (
    { body: { name } }: ServiceRequest<unknown, unknown, { name: string }>,
    res: Response
  ) => {
    try {
      const user = await UserSchema.create({
        name,
      });
      res.status(201).send(user);
    } catch (error) {
      console.log(error);
      res.sendStatus(Number(error) || 500);
    }
  }
);
