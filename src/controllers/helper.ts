interface ResponseBody {
  status?: number;
  message?: string;
  data?: unknown;
}

export const badRequest = (body: ResponseBody) => ({
  status: body?.status || 400,
  body,
});

export const created = (body: ResponseBody) => ({
  status: body?.status || 201,
  body: body.data,
});

export const serverError = (body?: ResponseBody) => ({
  status: body?.status || 500,
  body: {
    error: "Internal server error",
  },
});

export const ok = (body: ResponseBody) => ({
  status: body?.status || 200,
  body: body.data,
});
