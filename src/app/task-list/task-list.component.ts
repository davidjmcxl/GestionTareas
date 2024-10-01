// src/app/task-list/task-list.component.ts
import { Component, OnInit } from '@angular/core';
import { TaskFirebase } from '../interface/task.model';
import { TaskService } from '../services/task.service';
import { Timestamp } from '@angular/fire/firestore';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.scss']
})
export class TaskListComponent implements OnInit {
  tasks: TaskFirebase[] = [];
  filteredTasks: TaskFirebase[] = [];
  filterValue: string = 'all';
  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks.map(task => ({
        ...task,
        dueDate: task.dueDate instanceof Timestamp ? task.dueDate.toDate() : task.dueDate
      }));
      this.applyFilter();
    });
  }

  applyFilter(): void {
    if (this.filterValue === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else if (this.filterValue === 'pending') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else {
      this.filteredTasks = this.tasks;
    }
  }

  onFilterChange(value: string): void {
    this.filterValue = value;
    this.applyFilter();
  }

  async toggleTaskCompletion(task: TaskFirebase): Promise<void> {
    try {
      task.completed = !task.completed;
      await this.taskService.markTaskAsCompleted(task.id!, task.completed);
      this.applyFilter();
    } catch (error) {
      console.error('Error al actualizar el estado de la tarea:', error);
    }
  }
}
