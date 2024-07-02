import { createServerValidate, formOptions } from "@tanstack/react-form/nextjs";

export const formOpts = formOptions({
  defaultValues: {
    firstName: "",
    age: 0,
  },
});

export const serverValidate = createServerValidate({
  ...formOpts,
  onServerValidate({ value }) {
    if (value.age < 12) {
      return "age | You must be at least 12 to sign up";
    }

    if (value.firstName === "") {
      return "firstName | FirstName is required";
    }
  },
});
