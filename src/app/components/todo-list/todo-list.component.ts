import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';

interface Subtask {
  id: number;
  title: string;
  completed: boolean;
}

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: Date;
  status: 'todo' | 'doing' | 'done';
  isFavorite: boolean;
  subtasks?: Subtask[];
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatProgressBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    TaskDialogComponent
  ]
})
export class TodoListComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  filterValue: string = '';

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // Initialize with sample tasks
    this.tasks = [
      {
        id: 1,
        title: 'Complete project proposal',
        description: 'Finalize the project proposal document with all requirements and submit to the client for review.',
        dueDate: new Date('2025-04-01'),
        status: 'doing',
        isFavorite: true,
        subtasks: [
          { id: 1, title: 'Research requirements', completed: true },
          { id: 2, title: 'Draft proposal', completed: true },
          { id: 3, title: 'Review with team', completed: false },
          { id: 4, title: 'Finalize document', completed: false }
        ]
      },
      {
        id: 2,
        title: 'Team meeting',
        description: 'Weekly team meeting to discuss project progress and roadblocks.',
        dueDate: new Date('2025-03-28'),
        status: 'todo',
        isFavorite: false,
        subtasks: [
          { id: 1, title: 'Prepare agenda', completed: true },
          { id: 2, title: 'Send calendar invites', completed: true }
        ]
      },
      {
        id: 3,
        title: 'Code review',
        description: 'Review pull requests for the new features implemented by the team.',
        dueDate: new Date('2025-03-30'),
        status: 'done',
        isFavorite: false
      }
    ];
    this.filteredTasks = [...this.tasks];
  }

  applyFilter(): void {
    const filterText = this.filterValue.toLowerCase().trim();
    if (filterText === '') {
      this.filteredTasks = [...this.tasks];
    } else {
      this.filteredTasks = this.tasks.filter(task => 
        task.title.toLowerCase().includes(filterText) || 
        task.description.toLowerCase().includes(filterText)
      );
    }
  }

  openTaskDialog(task?: Task): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '600px',
      data: task ? {...task} : {
        id: this.getNextId(),
        title: '',
        description: '',
        dueDate: new Date(),
        status: 'todo',
        isFavorite: false
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (task) {
          // Update existing task
          const index = this.tasks.findIndex(t => t.id === task.id);
          if (index !== -1) {
            this.tasks[index] = result;
          }
        } else {
          // Add new task
          this.tasks.push(result);
        }
        // Refresh filtered tasks
        this.applyFilter();
      }
    });
  }

  toggleFavorite(task: Task, event: Event): void {
    event.stopPropagation(); // Prevent opening the dialog
    task.isFavorite = !task.isFavorite;
  }

  deleteTask(task: Task, event: Event): void {
    event.stopPropagation(); // Prevent opening the dialog
    if (confirm('Are you sure you want to delete this task?')) {
      this.tasks = this.tasks.filter(t => t.id !== task.id);
      this.applyFilter();
    }
  }

  hasSubtasks(task: Task): boolean {
    return !!task.subtasks && task.subtasks.length > 0;
  }

  getTotalSubtaskCount(task: Task): number {
    return task.subtasks?.length || 0;
  }

  getCompletedSubtaskCount(task: Task): number {
    return task.subtasks?.filter(subtask => subtask.completed).length || 0;
  }

  getSubtaskProgressValue(task: Task): number {
    const total = this.getTotalSubtaskCount(task);
    if (total === 0) return 0;
    return (this.getCompletedSubtaskCount(task) / total) * 100;
  }

  private getNextId(): number {
    return this.tasks.length > 0 
      ? Math.max(...this.tasks.map(task => task.id)) + 1 
      : 1;
  }
}