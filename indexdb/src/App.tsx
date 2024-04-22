import { useEffect, useState } from "react";
import { Student } from "./indexdb";
import {
  addStudent,
  getStudents,
  deleteStudent,
  updateStudent,
  clearStudents,
} from "./indexdb/db-utils";

const App = () => {
  const [students, setStudents] = useState<Student[]>([]);

  const student = {
    name: "John Doe",
    marks: Number(Number(Math.random() * 100).toFixed(2)),
    college: "XYZ",
  };

  useEffect(() => {
    getStudents()
      .then((students) => {
        setStudents(students);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <main>
      <section>
        <button
          onClick={() => {
            addStudent(student);
            setStudents([...students, student]);
          }}
        >
          Add student
        </button>
        <button onClick={getStudents}>Get students</button>
      </section>

      <div>
        <ul>
          {students.map((student) => (
            <li key={student.id}>
              <p>
                {student.name} - {student.marks} - {student.college}
              </p>
              <button
                onClick={() => {
                  deleteStudent(student.id!);
                  setStudents(students.filter((s) => s.id !== student.id));
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

                  setStudents(
                    students.map((s) =>
                      s.id === student.id
                        ? {
                            ...s,
                            name: "Jane Max",
                            marks: Number(
                              Number(Math.random() * 100).toFixed(2)
                            ),
                            college: "ABC",
                          }
                        : s
                    )
                  );
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
            setStudents([]);
          }}
        >
          Clear db
        </button>
      </div>
    </main>
  );
};

export default App;
