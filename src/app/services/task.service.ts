import { Injectable } from '@angular/core';
import { BehaviorSubject, from, map, Observable } from 'rxjs';
import { Task, TaskFirebase } from '../interface/task.model';
import { collection, doc, Firestore, getDocs, updateDoc } from '@angular/fire/firestore';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  constructor(private firestore: Firestore) {}

/**
 * Obtiene todas las tareas almacenadas en Firestore desde la colección 'tasks'.
 *
 * @returns {Observable<TaskFirebase[]>} Un observable que emite un array de objetos TaskFirebase.
 * Cada objeto de tarea incluye su ID y los datos asociados.
 *
 * }); */
  getTasks(): Observable<TaskFirebase[]> {
    const tasksCollection = collection(this.firestore, 'tasks');
    return from(getDocs(tasksCollection)).pipe(
      map(snapshot => {
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as unknown as TaskFirebase));
      })
    );
  }
/**
 * Actualiza el estado de completado de una tarea en Firestore.
 *
 * Este método permite marcar una tarea como completada o pendiente, actualizando
 * el campo `completed` en la base de datos Firestore.
 *
 * @param {string} taskId - El ID de la tarea que se desea actualizar.
 * @param {boolean} completed - El nuevo estado de la tarea.
 * `true` para marcarla como completada, `false` para marcarla como pendiente.
 *
 * @returns {Promise<void>} Una promesa que se resuelve cuando la tarea se ha
 * actualizado en Firestore.
 */
  async markTaskAsCompleted(taskId: string, completed: boolean): Promise<void> {
    const taskDocRef = doc(this.firestore, `tasks/${taskId}`);
    await updateDoc(taskDocRef, { completed });
  }}
