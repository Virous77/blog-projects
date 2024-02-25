"use client";

import { createData } from "./actions";
import Button from "../button";
import { RefObject, useRef } from "react";

const Example = () => {
  const formRef = useRef() as RefObject<HTMLFormElement>;

  const handleAction = async (e: FormData) => {
    try {
      const m = await createData(e);
      console.log(m);
      formRef?.current?.reset();
    } catch (error: any) {
      alert(error.message);
    }
  };

  return (
    <section>
      <form
        action={handleAction}
        className=" p-4 bg-gray-600 w-[500px] m-auto rounded"
        ref={formRef}
      >
        <input
          type="text"
          className=" w-full border-none outline-none p-2 rounded-md text-black"
          name="name"
        />

        <Button />
      </form>
    </section>
  );
};

export default Example;
