"use server";

import formFactory from "./form-factory";
const initialState = formFactory.initialFormState.values!;
export type TResult = typeof initialState;

const action = async (prev: unknown, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts",
    {}
  );
  const result = await response.json();
  console.log(result);

  const res = await formFactory.validateFormData(formData);
  if (res.errors && res.errors?.length > 0) return res;

  const data = getFormData(formData);
  console.log(data);

  return res;
};

export default action;

const getFormData = (formData: FormData) => {
  const result = {} as TResult;

  formData.forEach((data, key) => {
    if (key.includes("$ACTION")) return;
    (result as any)[key] = data;
  });

  return result;
};
