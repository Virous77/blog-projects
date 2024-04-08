import { treaty } from "@elysiajs/eden";
import { App } from "./api/[[...route]]/route";
import Link from "next/link";

export const client = treaty<App>("localhost:3000");

const Page = async () => {
  const { data } = await client.api.index.get();
  return (
    <main className=" w-full h-screen flex justify-center items-center flex-col">
      <h1 className=" text-2xl">Server Component</h1>
      {data}
      <Link
        href="/client"
        className=" mt-3 text-blue-600 hover:underline hover:underline-offset-4"
      >
        Fetch Data from Client Component
      </Link>
    </main>
  );
};

export default Page;
