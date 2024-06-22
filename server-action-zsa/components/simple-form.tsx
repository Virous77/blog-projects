"use client";

import { formAction } from "@/action/form-action";
import { useServerAction } from "zsa-react";

const SimpleForm = () => {
  const { isPending, isSuccess, data, error, isError, executeFormAction } =
    useServerAction(formAction);

  return (
    <section>
      <h1>Simple Form</h1>
      <form action={executeFormAction}>
        <input
          type="text"
          name="name"
          className="border border-gray-300 rounded-md p-2 w-full"
        />
        {isSuccess && <p>{data.name}</p>}
        <button
          type="submit"
          disabled={isPending}
          className="bg-blue-500 text-white p-2 rounded-md w-full mt-2 border-none"
        >
          {isPending ? "Loading..." : "Submit"}
        </button>
        {isError && (
          <p className="text-red-500">
            {error.fieldErrors && error.fieldErrors["name"]}
          </p>
        )}
      </form>
    </section>
  );
};

export default SimpleForm;
