interface ResponseBody {
  status?: number;
  message?: string;
  data?: unknown;
}

export const badRequest = (body: ResponseBody) => {
  return {
    status: body?.status || 400,
    body,
  };
};

export const created = (body: ResponseBody) => {
  return {
    status: body?.status || 201,
    body: body.data,
  };
};

export const serverError = (body?: ResponseBody) => {
  return {
    status: body?.status || 500,
    body: {
      error: "Internal server error",
    },
  };
};

export const ok = (body: ResponseBody) => {
  return {
    status: body?.status || 200,
    body: body.data,
  };
};
