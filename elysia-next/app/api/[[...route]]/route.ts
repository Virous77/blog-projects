// server.ts
import bearer from "@elysiajs/bearer";
import { Elysia, t } from "elysia";

const app = new Elysia({ prefix: "/api" })
  .get("/", () => "Hello from Elysia")
  .use(bearer())
  .onBeforeHandle(async ({ bearer, set }) => {
    if (!bearer) return (set.status = "Unauthorized");
    const isAuthorized = bearer === "12345678";
    if (!isAuthorized) {
      return (set.status = "Unauthorized");
    }
  })
  .post(
    "/sign",
    ({ bearer, body }) => {
      return body;
    },
    {
      body: t.Object({
        name: t.String(),
        password: t.String(),
      }),
    }
  );

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
