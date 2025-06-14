import { Response } from "express";

export const badRequest = (res: Response, message: string) =>
  res.status(400).json({ error: message });

export const created = (res: Response, data: unknown) =>
  res.status(201).json(data);

export const ok = (res: Response, data: unknown) => res.status(200).json(data);

export const notFound = (res: Response, message = "Not found") =>
  res.status(404).json({ error: message });

export const serverError = (res: Response) =>
  res.status(500).json({ error: "Internal server error" });
