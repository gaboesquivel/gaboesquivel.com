import { NextResponse } from "next/server";

export const runtime = "nodejs";

const retired = () =>
  NextResponse.json(
    {
      message:
        "This endpoint is retired. Use the unified /mcp server and the get_cv tool.",
      migration: "https://gaboesquivel.com/docs",
    },
    { status: 410 }
  );

export const GET = retired;
export const POST = retired;
export const DELETE = retired;
