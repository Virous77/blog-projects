"use client";

import {
  FormApi,
  mergeForm,
  useTransform,
  ValidationError,
} from "@tanstack/react-form";
import action, { TResult } from "./action";
import { useFormState } from "react-dom";
import formFactory from "./form-factory";

const Form = () => {
  const [state, setAction] = useFormState(action, formFactory.initialFormState);

  const { useStore, Subscribe, handleSubmit, Field } = formFactory.useForm({
    transform: useTransform(
      (baseForm: FormApi<any, any>) => mergeForm(baseForm, state),
      [state]
    ),
  });

  const formErrors = useStore((formState) => formState.errors);
  const errors = formErrors.reduce((acc, curr) => {
    if (!curr) return acc;
    const [key, value] = curr.split(" | ");
    const result = { ...acc, [key]: value };
    return result;
  }, {} as TResult);

  return (
    <section className=" flex flex-col items-center justify-center w-full h-screen">
      <form
        action={setAction as never}
        onSubmit={() => handleSubmit()}
        className="shadow-md p-4 rounded border border-gray-300  flex items-center gap-4 flex-col"
      >
        <div className="flex flex-col gap-3 w-full">
          <Field name="age">
            {(field) => {
              return (
                <>
                  <label className="font-bold font-mono" htmlFor="age">
                    Age
                  </label>
                  <input
                    className="text-black p-2 border border-gray-300 rounded w-full outline-none"
                    name="age"
                    id="age"
                    type="number"
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.valueAsNumber)}
                  />
                  <ErrorText error={field.state.meta.errors}>
                    {errors?.age}
                  </ErrorText>
                </>
              );
            }}
          </Field>

          <Field name="firstName">
            {(field) => {
              return (
                <>
                  <label className="font-bold font-mono" htmlFor="firstName">
                    FirstName
                  </label>
                  <input
                    className="text-black p-2 border border-gray-300 rounded w-full outline-none"
                    name="firstName"
                    type="text"
                    id="firstName"
                    value={field.state.value || ""}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                  <ErrorText error={field.state.meta.errors}>
                    {errors?.firstName}
                  </ErrorText>
                </>
              );
            }}
          </Field>
        </div>

        <Subscribe
          selector={(formState) => {
            return [formState.canSubmit, formState.isSubmitting];
          }}
        >
          {([canSubmit, isSubmitting]) => {
            console.log(isSubmitting);
            return (
              <button
                type="submit"
                disabled={!canSubmit}
                className="bg-blue-500 text-white p-2 rounded w-full"
              >
                {isSubmitting ? "Loading..." : "Submit"}
              </button>
            );
          }}
        </Subscribe>
      </form>
    </section>
  );
};

export default Form;

const ErrorText = ({
  children,
  error,
}: {
  children: React.ReactNode;
  error: ValidationError[];
}) => {
  return (
    <>
      {error.map((error) => (
        <p className="text-red-500 text-xs mt-1" key={error as string}>
          {error}
        </p>
      ))}
      <p className="text-red-500 text-xs mt-1">{children}</p>
    </>
  );
};
