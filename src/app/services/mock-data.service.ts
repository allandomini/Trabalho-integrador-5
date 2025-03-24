// src/app/services/mock-data.service.ts
import { Injectable } from '@angular/core';
import { Task } from '../models/task';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MockDataService {
  private mockTasks: Task[] = [
    {
      id: '1',
      title: 'Learn Angular',
      description: 'Finish the todo app tutorial',
      status: 'doing',
      dueDate: new Date('2025-03-25'),
      isFavorite: true,
      subtasks: [
        { id: '1-1', taskId: '1', title: 'Set up project', isCompleted: true, createdAt: new Date(), updatedAt: new Date() },
        { id: '1-2', taskId: '1', title: 'Create components', isCompleted: true, createdAt: new Date(), updatedAt: new Date() },
        { id: '1-3', taskId: '1', title: 'Add API integration', isCompleted: false, createdAt: new Date(), updatedAt: new Date() }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '2',
      title: 'Buy groceries',
      description: 'Get items for dinner',
      status: 'todo',
      dueDate: new Date('2025-03-18'),
      isFavorite: false,
      subtasks: [
        { id: '2-1', taskId: '2', title: 'Vegetables', isCompleted: false, createdAt: new Date(), updatedAt: new Date() },
        { id: '2-2', taskId: '2', title: 'Fruit', isCompleted: false, createdAt: new Date(), updatedAt: new Date() }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: '3',
      title: 'Complete project proposal',
      description: 'Finish the proposal for client meeting',
      status: 'done',
      dueDate: new Date('2025-03-15'),
      isFavorite: true,
      subtasks: [
        { id: '3-1', taskId: '3', title: 'Research competitors', isCompleted: true, createdAt: new Date(), updatedAt: new Date() },
        { id: '3-2', taskId: '3', title: 'Create outline', isCompleted: true, createdAt: new Date(), updatedAt: new Date() },
        { id: '3-3', taskId: '3', title: 'Write executive summary', isCompleted: true, createdAt: new Date(), updatedAt: new Date() }
      ],
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  getTasks(): Observable<Task[]> {
    return of(this.mockTasks);
  }

  getTaskById(id: string): Observable<Task> {
    const task = this.mockTasks.find(t => t.id === id);
    if (!task) {
      throw new Error(`Task with id ${id} not found`);
    }
    return of(task);
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    const newTask: Task = {
      ...task,
      id: Date.now().toString(),
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.mockTasks.push(newTask);
    return of(newTask);
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    this.mockTasks[index] = {
      ...this.mockTasks[index],
      ...task,
      updatedAt: new Date()
    };
    
    return of(this.mockTasks[index]);
  }

  deleteTask(id: string): Observable<void> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index !== -1) {
      this.mockTasks.splice(index, 1);
    }
    return of(undefined);
  }

  updateTaskStatus(id: string, status: 'todo' | 'doing' | 'done'): Observable<Task> {
    return this.updateTask(id, { status });
  }

  toggleFavorite(id: string): Observable<Task> {
    const index = this.mockTasks.findIndex(t => t.id === id);
    if (index === -1) {
      throw new Error(`Task with id ${id} not found`);
    }
    
    const task = this.mockTasks[index];
    return this.updateTask(id, { isFavorite: !task.isFavorite });
  }
}