"use server";

import { ServerValidateError } from "@tanstack/react-form/nextjs";
import { formOpts, serverValidate } from "./form-factory";

const initialState = formOpts?.defaultValues!;
export type TResult = typeof initialState;

const getFormData = (formData: FormData) => {
  const result = {} as TResult;

  formData.forEach((data, key) => {
    if (key.includes("$ACTION")) return;
    (result as any)[key] = data;
  });
  return result;
};

const formAction = async (prev: unknown, formData: FormData) => {
  try {
    await serverValidate(formData);

    const data = getFormData(formData);
    // Do something with the data
    console.log(data);
  } catch (error) {
    if (error instanceof ServerValidateError) {
      return error.formState;
    }
    throw error;
  }

  return formOpts?.defaultValues;
};

export default formAction;
