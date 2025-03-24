// src/app/components/header/header.component.ts
import { Component, OnInit } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule
  ],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  // Added for AdminHub-style dropdowns
  showNotificationMenu = false;
  showProfileMenu = false;
  isDarkMode = false;

  constructor(public authService: AuthService) {}

  ngOnInit(): void {
    // Check if dark mode was previously enabled
    const darkModeStatus = localStorage.getItem('darkMode');
    if (darkModeStatus === 'true') {
      this.isDarkMode = true;
      document.body.classList.add('dark');
    }
  }

  logout(): void {
    this.authService.logout();
  }

  // AdminHub-style method to toggle notification menu
  toggleNotificationMenu(event: Event): void {
    event.preventDefault();
    this.showNotificationMenu = !this.showNotificationMenu;
    this.showProfileMenu = false; // Close other menu
  }

  // AdminHub-style method to toggle profile menu
  toggleProfileMenu(event: Event): void {
    event.preventDefault();
    this.showProfileMenu = !this.showProfileMenu;
    this.showNotificationMenu = false; // Close other menu
  }

  // AdminHub-style dark mode toggle
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    
    if (this.isDarkMode) {
      document.body.classList.add('dark');
      localStorage.setItem('darkMode', 'true');
    } else {
      document.body.classList.remove('dark');
      localStorage.setItem('darkMode', 'false');
    }
  }
}