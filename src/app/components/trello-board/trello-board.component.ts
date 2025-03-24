import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { CdkDragDrop, moveItemInArray, transferArrayItem, DragDropModule } from '@angular/cdk/drag-drop';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task';
import { Subtask } from '../../models/subtask';
import { HeaderComponent } from '../header/header.component'; // Adicionado
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-trello-board',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    DragDropModule,
    HeaderComponent, // Adicionado
    FooterComponent // Adicionado
  ],
  templateUrl: './trello-board.component.html',
  styleUrl: './trello-board.component.scss'
})
export class TrelloBoardComponent implements OnInit {
  todoTasks: Task[] = [];
  doingTasks: Task[] = [];
  doneTasks: Task[] = [];

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.apiService.getTasks().subscribe(tasks => {
      // Ensure each task has a subtasks array initialized
      const tasksWithSubtasks = tasks.map(task => ({
        ...task,
        subtasks: task.subtasks || [] // This is the crucial fix!
      }));
      
      this.todoTasks = tasksWithSubtasks.filter(task => task.status === 'todo');
      this.doingTasks = tasksWithSubtasks.filter(task => task.status === 'doing');
      this.doneTasks = tasksWithSubtasks.filter(task => task.status === 'done');
    });
  }

  // Helper methods to safely handle subtask operations
  getCompletedSubtaskCount(task: Task): number {
    if (!task.subtasks || !Array.isArray(task.subtasks)) {
      return 0;
    }
    return task.subtasks.filter(subtask => subtask && subtask.isCompleted).length;
  }

  getTotalSubtaskCount(task: Task): number {
    if (!task.subtasks || !Array.isArray(task.subtasks)) {
      return 0;
    }
    return task.subtasks.length;
  }

  hasSubtasks(task: Task): boolean {
    return this.getTotalSubtaskCount(task) > 0;
  }

  getTaskStatusIcon(task: Task): string {
    if (task.isFavorite) {
      return 'star';
    }
    return 'star_border';
  }

  drop(event: CdkDragDrop<Task[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      const item = event.previousContainer.data[event.previousIndex];
      let newStatus: 'todo' | 'doing' | 'done';
      
      if (event.container.id === 'todoList') {
        newStatus = 'todo';
      } else if (event.container.id === 'doingList') {
        newStatus = 'doing';
      } else {
        newStatus = 'done';
      }
      
      this.apiService.updateTaskStatus(item.id, newStatus).subscribe(() => {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex,
        );
      });
    }
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: task ? { ...task } : { 
        title: '', 
        description: '', 
        status: 'todo', 
        dueDate: new Date(),
        isFavorite: false,
        subtasks: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          // Update existing task
          this.apiService.updateTask(task.id, result).subscribe(() => {
            this.loadTasks();
          });
        } else {
          // Create new task
          this.apiService.createTask(result).subscribe(() => {
            this.loadTasks();
          });
        }
      }
    });
  }

  toggleFavorite(task: Task, event: Event): void {
    event.stopPropagation();
    this.apiService.toggleFavorite(task.id).subscribe(() => {
      this.loadTasks();
    });
  }
}