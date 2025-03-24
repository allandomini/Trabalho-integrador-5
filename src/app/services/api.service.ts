// src/app/services/api.service.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, catchError } from 'rxjs';
import { Task } from '../models/task';
import { Subtask } from '../models/subtask';
import { MockDataService } from './mock-data.service';
import { isPlatformServer } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://localhost:8080/api';
  private useServerSide: boolean;

  constructor(
    private http: HttpClient,
    private mockService: MockDataService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    // During server-side rendering, always use mock data
    this.useServerSide = isPlatformServer(platformId);
  }

  // Task CRUD operations
  getTasks(): Observable<Task[]> {
    if (this.useServerSide) {
      return this.mockService.getTasks();
    }
    
    return this.http.get<Task[]>(`${this.apiUrl}/tasks`)
      .pipe(
        catchError(error => {
          console.error('Could not load tasks:', error);
          return this.mockService.getTasks();
        })
      );
  }

  getTaskById(id: string): Observable<Task> {
    if (this.useServerSide) {
      return this.mockService.getTaskById(id);
    }
    
    return this.http.get<Task>(`${this.apiUrl}/tasks/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Could not load task ${id}:`, error);
          return this.mockService.getTaskById(id);
        })
      );
  }

  createTask(task: Omit<Task, 'id'>): Observable<Task> {
    if (this.useServerSide) {
      return this.mockService.createTask(task);
    }
    
    return this.http.post<Task>(`${this.apiUrl}/tasks`, task)
      .pipe(
        catchError(error => {
          console.error('Could not create task:', error);
          return this.mockService.createTask(task);
        })
      );
  }

  updateTask(id: string, task: Partial<Task>): Observable<Task> {
    if (this.useServerSide) {
      return this.mockService.updateTask(id, task);
    }
    
    return this.http.put<Task>(`${this.apiUrl}/tasks/${id}`, task)
      .pipe(
        catchError(error => {
          console.error(`Could not update task ${id}:`, error);
          return this.mockService.updateTask(id, task);
        })
      );
  }

  deleteTask(id: string): Observable<void> {
    if (this.useServerSide) {
      return this.mockService.deleteTask(id);
    }
    
    return this.http.delete<void>(`${this.apiUrl}/tasks/${id}`)
      .pipe(
        catchError(error => {
          console.error(`Could not delete task ${id}:`, error);
          return this.mockService.deleteTask(id);
        })
      );
  }

  // Subtask operations are skipped for brevity but would follow the same pattern

  // Task status operations
  updateTaskStatus(id: string, status: 'todo' | 'doing' | 'done'): Observable<Task> {
    if (this.useServerSide) {
      return this.mockService.updateTaskStatus(id, status);
    }
    
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}/status`, { status })
      .pipe(
        catchError(error => {
          console.error(`Could not update task ${id} status:`, error);
          return this.mockService.updateTaskStatus(id, status);
        })
      );
  }

  // Favorite operations
  toggleFavorite(id: string): Observable<Task> {
    if (this.useServerSide) {
      return this.mockService.toggleFavorite(id);
    }
    
    return this.http.patch<Task>(`${this.apiUrl}/tasks/${id}/favorite`, {})
      .pipe(
        catchError(error => {
          console.error(`Could not toggle favorite for task ${id}:`, error);
          return this.mockService.toggleFavorite(id);
        })
      );
  }
}