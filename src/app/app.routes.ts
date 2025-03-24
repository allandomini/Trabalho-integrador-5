// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  { 
    path: 'login', 
    loadComponent: () => import('./components/login/login.component').then(m => m.LoginComponent) 
  },
  { 
    path: '', 
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
    canActivate: [authGuard] // Protege a rota
  },
  { 
    path: 'trello-board', 
    loadComponent: () => import('./components/trello-board/trello-board.component').then(m => m.TrelloBoardComponent),
    canActivate: [authGuard] // Protege a rota
  },
  { 
    path: 'todo-list', 
    loadComponent: () => import('./components/todo-list/todo-list.component').then(m => m.TodoListComponent),
    canActivate: [authGuard] // Protege a rota
  },
  { 
    path: '**', 
    redirectTo: 'login' // Redireciona para login se a rota não existir
  }
];