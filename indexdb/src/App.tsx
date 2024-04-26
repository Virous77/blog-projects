import {
  getStudents,
  deleteStudent,
  updateStudent,
  clearStudents,
} from "./indexdb/db-utils";
import StudentForm from "./components/StudentForm";
import { useLiveQuery } from "dexie-react-hooks";

const App = () => {
  const friends = useLiveQuery(() => getStudents());

  return (
    <main>
      <section>
        <StudentForm />
      </section>

      <div>
        <ul>
          {friends?.map((student) => (
            <li key={student.id}>
              <p>
                {student.name} - {student.marks} - {student.college}
              </p>
              <button
                onClick={() => {
                  deleteStudent(student.id!);
                }}
              >
                Delete
              </button>
              <button
                onClick={() => {
                  updateStudent(student.id!, {
                    name: "Jane Max",
                    marks: Number(Number(Math.random() * 100).toFixed(2)),
                    college: "ABC",
                  });
                }}
              >
                Update
              </button>
            </li>
          ))}
        </ul>
        <button
          onClick={() => {
            clearStudents();
          }}
        >
          Clear db
        </button>
      </div>
    </main>
  );
};

export default App;
