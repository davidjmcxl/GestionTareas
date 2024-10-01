import { Person } from "./person.model";

export interface Task {
  name: string;
  deadline: Date;
  completed: boolean;
  people: Person[];
}
export interface TaskFirebase {
  id?: string; // ID opcional para Firestore
  taskName: string;
  dueDate: Date;
  people: {
    fullName: string;
    age: number;
    skills: {
      name: string;
    }[];
  }[];
}export interface TaskFirebase {
  id?: string; // ID opcional para Firestore
  taskName: string;
  dueDate: Date;
  completed: boolean; // Nuevo campo para indicar si la tarea está completada
  people: {
    fullName: string;
    age: number;
    skills: {
      name: string;
    }[];
  }[];
}

