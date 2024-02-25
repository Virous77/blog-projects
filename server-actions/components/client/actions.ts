"use server";

import zod from "zod";

const schema = zod.object({
  name: zod.string().min(1, { message: "Name is required" }),
});

export const createData = async (e: FormData) => {
  const name = e.get("name");

  try {
    const data = schema.parse({ name });
    console.log(data);
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      throw new Error(error.errors[0].message);
    } else {
      throw new Error(error.message || "Failed to add data");
    }
  }
};
