import { Request, Response } from "express";

export function getAll(req: Request, res: Response) {
  try {
    const products = [{ 1: 1 }];
    res.json(products);
    return;
  } catch (error) {
    res.status(500).send("Internal Server Error");
    return;
  }
}
