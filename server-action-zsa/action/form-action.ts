"use server";

import z from "zod";
import { createServerAction } from "zsa";

export const formAction = createServerAction()
  .input(
    z.object({
      name: z
        .string()
        .min(2, { message: "Name must be at least 2 characters." }),
    }),
    {
      type: "formData",
    }
  )
  .output(z.object({ name: z.string() }))
  .handler(async ({ input }) => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    return {
      name: "Hello" + " " + input.name,
    };
  });
