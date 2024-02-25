"use client";

import { useFormStatus } from "react-dom";

const Button = () => {
  const { pending } = useFormStatus();
  return (
    <button className=" p-2 rounded w-full bg-zinc-500 mt-2">
      {pending ? "Loading..." : "Submit"}
    </button>
  );
};

export default Button;
