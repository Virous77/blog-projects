import { db, Student } from ".";

export const addStudent = async (student: Student) => {
  const res = await db.students.add(student);
  return res;
};

export const getStudents = async () => {
  const students = await db.students.toArray();
  return students;
};

export const deleteStudent = async (id: number) => {
  const res = await db.students.delete(id);
  return res;
};

export const updateStudent = async (id: number, student: Student) => {
  const res = await db.students.update(id, student);
  return res;
};

export const clearStudents = async () => {
  const res = await db.students.clear();
  return res;
};
