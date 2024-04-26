import { db, Student } from "../indexdb";

const StudentForm = () => {
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const student: Student = {
      name: formData.get("name") as string,
      marks: Number(formData.get("marks")),
      college: formData.get("college") as string,
    };
    await db.students.add(student);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="name" placeholder="Name" />
      <input type="number" name="marks" placeholder="Marks" />
      <input type="text" name="college" placeholder="College" />
      <button type="submit">Submit</button>
    </form>
  );
};

export default StudentForm;
