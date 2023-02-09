import express, { Response } from "express";
import { ServiceRequest } from "../interfaces";

export const apiRouter = express.Router();

apiRouter.get("/", async (_req: ServiceRequest, res: Response) => {
  try {
    res.send("api root");
  } catch (error) {
    console.log(error);
    res.sendStatus(Number(error) || 500);
  }
});
