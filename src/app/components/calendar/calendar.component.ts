// src/app/components/calendar/calendar.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullCalendarModule } from '@fullcalendar/angular';
import { CalendarOptions, EventClickArg, DateSelectArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { TaskDialogComponent } from '../task-dialog/task-dialog.component';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    MatDialogModule
  ],
  template: `
    <div class="calendar-container">
      <div class="calendar-header">
        <h2>Task Calendar</h2>
      </div>
      <div class="calendar-content">
        <full-calendar [options]="calendarOptions"></full-calendar>
      </div>
    </div>
  `,
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent implements OnInit {
  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    weekends: true,
    selectable: true,
    select: this.handleDateSelect.bind(this),
    eventClick: this.handleEventClick.bind(this),
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,dayGridWeek'
    },
    events: []
  };

  constructor(
    private apiService: ApiService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.apiService.getTasks().subscribe(tasks => {
      const events = tasks.map(task => ({
        id: task.id,
        title: task.title,
        start: new Date(task.dueDate),
        classNames: [
          `status-${task.status}`,
          task.isFavorite ? 'favorite' : ''
        ],
        extendedProps: {
          description: task.description,
          status: task.status,
          isFavorite: task.isFavorite,
          subtasks: task.subtasks
        }
      }));
      
      this.calendarOptions.events = events;
    });
  }

  handleDateSelect(selectInfo: DateSelectArg): void {
    const dialogRef = this.dialog.open(TaskDialogComponent, {
      width: '500px',
      data: {
        title: '',
        description: '',
        status: 'todo',
        dueDate: selectInfo.start,
        isFavorite: false,
        subtasks: []
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.apiService.createTask(result).subscribe(() => {
          this.loadTasks();
        });
      }
    });
  }

  handleEventClick(clickInfo: EventClickArg): void {
    const taskId = clickInfo.event.id;
    
    this.apiService.getTaskById(taskId).subscribe(task => {
      const dialogRef = this.dialog.open(TaskDialogComponent, {
        width: '500px',
        data: { ...task }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.apiService.updateTask(taskId, result).subscribe(() => {
            this.loadTasks();
          });
        }
      });
    });
  }
}