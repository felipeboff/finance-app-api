import { Response } from "express";

import { AppError } from "@/errors/app.error";

export const ok = (res: Response, data: unknown) => res.status(200).json(data);

export const created = (res: Response, data: unknown) =>
  res.status(201).json(data);

export const badRequest = (res: Response, message = "Bad request") =>
  res.status(400).json({ error: message });

export const unauthorized = (res: Response, message = "Unauthorized") =>
  res.status(401).json({ error: message });

export const forbidden = (res: Response, message = "Forbidden") =>
  res.status(403).json({ error: message });

export const notFound = (res: Response, message = "Not found") =>
  res.status(404).json({ error: message });

export const methodNotAllowed = (
  res: Response,
  message = "Method not allowed",
) => res.status(405).json({ error: message });

export const conflict = (res: Response, message = "Conflict") =>
  res.status(409).json({ error: message });

export const gone = (res: Response, message = "Gone") =>
  res.status(410).json({ error: message });

export const preconditionFailed = (
  res: Response,
  message = "Precondition Failed",
) => res.status(412).json({ error: message });

export const unsupportedMediaType = (
  res: Response,
  message = "Unsupported media type",
) => res.status(415).json({ error: message });

export const unprocessableEntity = (
  res: Response,
  message = "Unprocessable entity",
) => res.status(422).json({ error: message });

export const tooManyRequests = (res: Response, message = "Too many requests") =>
  res.status(429).json({ error: message });

export const serverError = (res: Response, message = "Internal server error") =>
  res.status(500).json({ error: message });

export const notImplemented = (res: Response, message = "Not implemented") =>
  res.status(501).json({ error: message });

export const badGateway = (res: Response, message = "Bad gateway") =>
  res.status(502).json({ error: message });

export const serviceUnavailable = (
  res: Response,
  message = "Service unavailable",
) => res.status(503).json({ error: message });

export const gatewayTimeout = (res: Response, message = "Gateway timeout") =>
  res.status(504).json({ error: message });

export const handleAppError = (res: Response, err: AppError) =>
  res.status(err.statusCode).json({ error: err.message });
