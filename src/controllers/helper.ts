import { Response } from "express";

interface ResponseBody {
  message?: string;
  data?: Response;
}

export const badRequest = (body: ResponseBody) => {
  return {
    status: 400,
    body,
  };
};

export const created = (body: ResponseBody) => {
  return {
    status: 201,
    body: body.data,
  };
};

export const serverError = () => {
  return {
    status: 500,
    body: {
      error: "Internal server error",
    },
  };
};
