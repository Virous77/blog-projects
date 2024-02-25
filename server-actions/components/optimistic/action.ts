"use server";

import { revalidatePath } from "next/cache";
import zod from "zod";

type TData = {
  id: number;
  like: number;
};

const schema = zod.object({
  id: zod.number().min(1),
  like: zod.number().min(1),
});

export const createData = async (e: TData) => {
  try {
    const data = schema.parse(e);
    // update data in database

    await new Promise((resolve) => setTimeout(resolve, 4000));
    revalidatePath("/");
  } catch (error: any) {
    if (error instanceof zod.ZodError) {
      throw new Error(error.errors[0].message);
    } else {
      throw new Error(error.message || "Failed to add data");
    }
  }
};
