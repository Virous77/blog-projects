"use server";

import formFactory from "./form-factory";
const initialState = formFactory.initialFormState.values!;
export type TResult = typeof initialState;

const getFormData = (formData: FormData) => {
  const result = {} as TResult;

  formData.forEach((data, key) => {
    if (key.includes("$ACTION")) return;
    (result as any)[key] = data;
  });
  return result;
};

const action = async (prev: unknown, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const res = await formFactory.validateFormData(formData);
  if (res.errors && res.errors?.length > 0) return res;

  const data = getFormData(formData);
  console.log(data);

  return res;
};

export default action;
