import { apiNotFound, methodNotAllowed } from "lib/api/problem";

export const runtime = "nodejs";

const unknownApi = (req: Request) =>
  apiNotFound(`No API route for ${new URL(req.url).pathname}.`);

export const GET = (req: Request) => unknownApi(req);
export const POST = (req: Request) => unknownApi(req);
export const PUT = (req: Request) => unknownApi(req);
export const PATCH = (req: Request) => unknownApi(req);
export const DELETE = (req: Request) => unknownApi(req);
export const HEAD = () => methodNotAllowed("GET");
