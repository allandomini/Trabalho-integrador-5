// src/app/components/home/home.component.ts
import { Component, OnInit, ViewChild, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CommonModule } from '@angular/common';
import { MatTabGroup, MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TodoListComponent } from '../todo-list/todo-list.component';
import { CalendarComponent } from '../calendar/calendar.component';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ApiService } from '../../services/api.service';
import { Task } from '../../models/task';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    MatTabsModule,
    TodoListComponent,
    CalendarComponent,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  // Task counters for the dashboard
  todoCount = 0;
  doingCount = 0;
  doneCount = 0;
  favoriteCount = 0;

  // For the greeting message
  welcomeMessage = '';

  // For persistent tab selection
  selectedTabIndex = 0;

  // For showing upcoming tasks
  upcomingTasks: Task[] = [];

  // Add these for AdminHub-style sidebar and UI controls
  sidebarHidden = false;
  isDarkMode = false;
  showNotificationMenu = false;
  showProfileMenu = false;

  // Add this to check if we're in browser
  private isBrowser: boolean;

  constructor(
    private apiService: ApiService,
    @Inject(PLATFORM_ID) platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    // Set welcome message based on time of day
    this.setWelcomeMessage();

    // Load tasks data for dashboard
    this.loadTaskData();

    // Check if sidebar was hidden previously
    if (this.isBrowser) {
      this.restoreTabState();
      this.restoreSidebarState();
      this.restoreDarkModeState();
    }

    // Check screen size for responsive design
    this.checkScreenSize();
    if (this.isBrowser) {
      window.addEventListener('resize', () => this.checkScreenSize());
    }
  }

  setWelcomeMessage(): void {
    if (this.isBrowser) {
      const hour = new Date().getHours();
      let greeting = '';

      if (hour < 12) {
        greeting = 'Good morning!';
      } else if (hour < 18) {
        greeting = 'Good afternoon!';
      } else {
        greeting = 'Good evening!';
      }

      this.welcomeMessage = greeting;
    } else {
      // Default message for server rendering
      this.welcomeMessage = 'Welcome!';
    }
  }

  loadTaskData(): void {
    this.apiService.getTasks().subscribe({
      next: (tasks) => {
        // Count tasks by status
        this.todoCount = tasks.filter(task => task.status === 'todo').length;
        this.doingCount = tasks.filter(task => task.status === 'doing').length;
        this.doneCount = tasks.filter(task => task.status === 'done').length;
        this.favoriteCount = tasks.filter(task => task.isFavorite).length;

        // Get upcoming tasks (due in the next 3 days), only on browser
        if (this.isBrowser) {
          const today = new Date();
          const threeDaysLater = new Date();
          threeDaysLater.setDate(today.getDate() + 3);

          this.upcomingTasks = tasks.filter(task => {
            const dueDate = new Date(task.dueDate);
            return dueDate >= today && dueDate <= threeDaysLater && task.status !== 'done';
          });
        } else {
          this.upcomingTasks = []; // Fallback for SSR
        }
      },
      error: (err) => {
        console.error('Could not load tasks:', err);
      }
    });
  }

  // When tab changes, save the state
  tabChanged(index: number): void {
    this.selectedTabIndex = index;
    if (this.isBrowser) {
      localStorage.setItem('selectedTab', index.toString());
    }
  }

  // Restore tab state from local storage
  restoreTabState(): void {
    if (this.isBrowser) {
      const savedTab = localStorage.getItem('selectedTab');
      if (savedTab !== null) {
        this.selectedTabIndex = parseInt(savedTab, 10);
      }
    }
  }

  // Method to refresh data (can be called from child components)
  refreshData(): void {
    this.loadTaskData();
  }

  // AdminHub-style methods
  toggleSidebar(): void {
    this.sidebarHidden = !this.sidebarHidden;
    if (this.isBrowser) {
      localStorage.setItem('sidebarHidden', this.sidebarHidden.toString());
    }
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    if (this.isBrowser) {
      localStorage.setItem('darkMode', this.isDarkMode.toString());
      if (this.isDarkMode) {
        document.body.classList.add('dark');
      } else {
        document.body.classList.remove('dark');
      }
    }
  }

  toggleNotificationMenu(event: Event): void {
    event.preventDefault();
    this.showNotificationMenu = !this.showNotificationMenu;
    this.showProfileMenu = false; // Close other menu
  }

  toggleProfileMenu(event: Event): void {
    event.preventDefault();
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotificationMenu = false; // Close other menu
  }

  restoreSidebarState(): void {
    if (this.isBrowser) {
      const savedSidebar = localStorage.getItem('sidebarHidden');
      if (savedSidebar === 'true') {
        this.sidebarHidden = true;
      }
    }
  }

  restoreDarkModeState(): void {
    if (this.isBrowser) {
      const savedDarkMode = localStorage.getItem('darkMode');
      if (savedDarkMode === 'true') {
        this.isDarkMode = true;
        document.body.classList.add('dark');
      }
    }
  }

  // Check screen size for responsive design
  checkScreenSize(): void {
    if (this.isBrowser && window.innerWidth <= 576) {
      this.sidebarHidden = true;
    }
  }

  // Close menus when clicked outside
  closeMenus(): void {
    this.showNotificationMenu = false;
    this.showProfileMenu = false;
  }
}