export const plainTextResponse = (body: string) =>
  new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
