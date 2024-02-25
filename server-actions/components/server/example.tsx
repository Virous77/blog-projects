import Button from "../button";
import z from "zod";

const schema = z.object({
  name: z.string().min(1),
});

const Example = () => {
  const handleFormSubmit = async (e: FormData) => {
    "use server";
    try {
      const name = e.get("name");
      const data = schema.parse({ name });

      /// DB work using prisma or other ORM
      console.log(data);
    } catch (error) {
      // must create error boundary or add error.ts file in page root folder
      if (error instanceof z.ZodError) {
        throw new Error(error.errors[0].message);
      }
      throw new Error("Failed to add data");
    }
  };
  return (
    <section>
      <form
        action={handleFormSubmit}
        className=" p-4 bg-gray-600 w-[500px] m-auto rounded"
      >
        <input
          type="text"
          name="name"
          className=" w-full border-none outline-none p-2 rounded-md text-black"
        />
        <Button />
      </form>
    </section>
  );
};

export default Example;
