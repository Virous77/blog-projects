import Dexie, { Table } from "dexie";

export interface Student {
  id?: number;
  name: string;
  marks: number;
  college: string;
}

export class MySubClassedDexie extends Dexie {
  students!: Table<Student>;

  constructor() {
    super("student");
    this.version(1).stores({
      students: "++id, name, marks, college",
    });
  }
}

export const db = new MySubClassedDexie();
