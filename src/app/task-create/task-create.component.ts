import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';
import { MaterialModule } from '../shared/material/material.module';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-task-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.scss']
})
export class TaskCreateComponent {
  taskForm: FormGroup;

  constructor(private fb: FormBuilder, private firestore: Firestore) {
    this.taskForm = this.fb.group({
      taskName: ['', [Validators.required, Validators.minLength(5)]],
      dueDate: ['', Validators.required],
      people: this.fb.array([]),
    });
    this.addPerson();
  }

  get people(): FormArray {
    return this.taskForm.get('people') as FormArray;
  }

  createPersonForm(): FormGroup {
    return this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(5)]],
      age: ['', [Validators.required, Validators.min(18)]],
      skills: this.fb.array([this.createSkillForm()])
    });
  }

  createSkillForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required] // Campo para el nombre de la habilidad
    });
  }

  addPerson(): void {
    const newPerson = this.createPersonForm();
    this.people.push(newPerson);
    newPerson.markAsPristine();
    newPerson.markAsUntouched();
  }

  getSkills(personIndex: number): FormArray {
    return this.people.at(personIndex).get('skills') as FormArray;
  }

  removePerson(index: number): void {
    this.people.removeAt(index);
  }

  addSkill(personIndex: number): void {
    const skillsArray = this.getSkills(personIndex);
    const newSkill = this.createSkillForm();
    skillsArray.push(newSkill);
    newSkill.markAsPristine();
    newSkill.markAsUntouched();
  }

  removeSkill(personIndex: number, skillIndex: number): void {
    const skillsArray = this.getSkills(personIndex);
    skillsArray.removeAt(skillIndex);
  }

  async onSubmit(): Promise<void> {
    const taskData = this.taskForm.value
    if(this.taskForm.invalid){
      return
    }
    try {
      const tasksCollection = collection(this.firestore, 'tasks'); // Nombre de la colección
      await addDoc(tasksCollection, taskData); // Agregar la tarea a Firestore
      Swal.fire({
        title: 'Success!',
        text: 'Tarea guardada con éxito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })

      // Resetear el formulario después de guardar
      this.taskForm.reset();
      while (this.people.length) {
        this.people.removeAt(0);
      }
      this.addPerson(); // Añadir una persona por defecto nuevamente
    } catch (error) {
      Swal.fire({
        title: 'Error!',
        text: 'Error al guardar la tarea',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      })
      console.error('Error al guardar la tarea: ', error);
    }
  }
}
