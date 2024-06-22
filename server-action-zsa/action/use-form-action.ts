"use server";

import z from "zod";
import { createServerActionProcedure } from "zsa";

const authProcedure = createServerActionProcedure()
  .input(
    z.object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters." }),
    })
  )
  .onComplete((res) => {
    if (res.isError) console.error(res.error);
    if (res.status && res.status === "success") {
      // after successful call do something like send email
      console.log(res.data);
    }
  })
  .handler(async ({ request, input, responseMeta }) => {
    // do something like check if user is authenticated
    if (input.name !== "Reetesh") throw new Error("Invalid user");

    return {
      isAuth: true,
    };
  });

export const formAction = authProcedure
  .createServerAction()
  .onComplete((res) => {
    if (res.isError) console.error(res.error);
    if (res.status && res.status === "success") {
      console.log(res.data);
    }
  })
  .timeout(1000)
  .output(z.object({ name: z.string() }))
  .handler(async ({ input, ctx }) => {
    console.log(ctx);
    await new Promise((resolve) => setTimeout(resolve, 3000));

    return {
      name: "Hello" + " " + input.name,
    };
  });
