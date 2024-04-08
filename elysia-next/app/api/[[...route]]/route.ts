// server.ts
import bearer from "@elysiajs/bearer";
import { Elysia, t } from "elysia";

type TSet = {
  headers: Record<string, string> & {
    "Set-Cookie"?: string | string[] | undefined;
  };
  status?: any;
  redirect?: string | undefined;
  cookie?: Record<string, any> | undefined;
};

const validateBearer = ({
  bearer,
  set,
}: {
  bearer: string | undefined;
  set: TSet;
}) => {
  if (!bearer) {
    set.status = 400;
    set.headers[
      "WWW-Authenticate"
    ] = `Bearer realm='sign', error="invalid_request"`;

    return "Unauthorized";
  }
};

const app = new Elysia({ prefix: "/api" })
  .use(bearer())
  .get("/", () => "Hello from Elysia")
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

      beforeHandle({ bearer, set }) {
        return validateBearer({ bearer, set });
      },
    }
  );

export type App = typeof app;

export const GET = app.handle;
export const POST = app.handle;
export const PUT = app.handle;
export const DELETE = app.handle;
