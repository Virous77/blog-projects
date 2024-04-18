import { createFormFactory } from "@tanstack/react-form";

const formFactory = createFormFactory({
  defaultValues: {
    firstName: "",
    age: 0,
  },
  onServerValidate({ value }) {
    if (value.age < 12) {
      return "age | You must be at least 12 to sign up";
    }

    if (value.firstName === "") {
      return "firstName | First name is required";
    }
  },
});

export default formFactory;
