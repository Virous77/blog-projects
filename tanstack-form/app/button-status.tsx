import React from "react";
import { useFormStatus } from "react-dom";

const ButtonStatus = ({ canSubmit }: { canSubmit: boolean }) => {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={!canSubmit}
      className="bg-blue-500 text-white p-2 rounded w-full"
    >
      {pending ? "Loading..." : "Submit"}
    </button>
  );
};

export default ButtonStatus;
