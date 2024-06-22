import FormComp from "@/components/form";
import SimpleForm from "@/components/simple-form";

const HomePage = () => {
  return (
    <main className="flex items-center justify-center h-screen flex-col gap-3">
      <FormComp />
      <SimpleForm />
    </main>
  );
};

export default HomePage;
