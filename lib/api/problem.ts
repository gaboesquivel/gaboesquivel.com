import { siteOrigin } from "lib/site-path";

const BASE_URL = siteOrigin;

export type ApiErrorCode = "not_found" | "method_not_allowed" | "invalid_path";

const titles: Record<ApiErrorCode, string> = {
  invalid_path: "Invalid path",
  method_not_allowed: "Method not allowed",
  not_found: "Not found",
};

export const apiProblem = ({
  code,
  status,
  detail,
  resolution,
}: {
  code: ApiErrorCode;
  status: number;
  detail: string;
  resolution: string;
}) => ({
  code,
  detail,
  message: detail,
  resolution,
  status,
  title: titles[code],
  type: `${BASE_URL}/docs#api-errors`,
});

export const problemResponse = (
  problem: ReturnType<typeof apiProblem>,
  headers?: HeadersInit
) =>
  Response.json(problem, {
    headers: {
      "Content-Type": "application/problem+json; charset=utf-8",
      Link: '</openapi.json>; rel="describedby"',
      ...headers,
    },
    status: problem.status,
  });

export const jsonResponse = (body: unknown, status = 200) =>
  Response.json(body, {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      Link: '</openapi.json>; rel="describedby"',
    },
    status,
  });

export const methodNotAllowed = (allow = "GET") =>
  problemResponse(
    apiProblem({
      code: "method_not_allowed",
      detail: `This endpoint accepts ${allow} only.`,
      resolution:
        "See the operation in openapi.json and retry with an allowed method.",
      status: 405,
    }),
    { Allow: allow }
  );

export const apiNotFound = (detail: string) =>
  problemResponse(
    apiProblem({
      code: "not_found",
      detail,
      resolution:
        "List available paths with GET /api/v1/pages or read openapi.json.",
      status: 404,
    })
  );
