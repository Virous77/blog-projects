"use client";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "../page";
import { FormEvent } from "react";

type SignUp = {
  name: string;
  password: string;
};

const Client = () => {
  const { data: index, isLoading } = useQuery({
    queryKey: ["index"],
    queryFn: () => client.api.index.get(),
  });

  const signUp = async ({ name, password }: SignUp) => {
    try {
      const { data, error } = await client.api.sign.post(
        {
          name,
          password,
        },
        {
          headers: {
            Authorization: "Bearer 12345",
          },
        }
      );
      if (error) throw error;
      return data;
    } catch (error) {
      throw error;
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: signUp,
  });

  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const userData = Object.fromEntries(formData) as {
      name: string;
      password: string;
    };

    const { name, password } = userData;
    if (password.trim() === "" || name.trim() === "")
      return alert("Fields are required");
    const data = await mutateAsync(userData);
    alert(`You have signed up as ${data.name} with password ${data.password}`);
  };

  return (
    <main className=" flex items-center justify-center w-full h-screen flex-col">
      <h1 className=" text-2xl">Client Component</h1>
      <p> {isLoading ? "Loading..." : index?.data}</p>

      <form
        onSubmit={handleSignUp}
        className="flex flex-col gap-2 w-[500px] shadow p-2 rounded border mt-3"
      >
        <input
          type="text"
          name="name"
          className=" bg-gray-800 p-2 outline-none"
        />
        <input
          type="password"
          name="password"
          className="bg-gray-800 p-2 outline-none"
        />
        <button
          type="submit"
          className=" p-2 bg-blue-600 rounded hover:bg-blue-500"
        >
          {isPending ? "Loading..." : "Sign Up"}
        </button>
      </form>
    </main>
  );
};

export default Client;
