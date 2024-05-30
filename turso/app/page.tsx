import React from "react";
import db from "@/db";
import { user } from "@/db/schema";
import { desc } from "drizzle-orm";

export const dynamic = "force-dynamic";

const createUser = async () => {
  console.log("createUser");
  await db
    .insert(user)
    .values({
      id: "3",
      email: "test@gmail.com",
      name: "test",
      image: "test.png",
      password: "1234",
    })
    .returning();
};

const getUser = async () => {
  const users = await db.select().from(user).orderBy(desc(user.createdAt));
  return users;
};

const page = async () => {
  await createUser();
  const p = await getUser();
  console.log(p);

  return (
    <div>
      <h1>Page</h1>
      <p>{JSON.stringify(p)}</p>
    </div>
  );
};

export default page;
