// src/app/app.component.ts
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive, MatToolbarModule, MatButtonModule, MatIconModule, HttpClientModule],
  templateUrl: './app.component.html', // Moveu o template para o arquivo HTML
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'todo-calendar-app';

  constructor() {
    // O título pode ser ajustado dinamicamente com base na rota, se desejar
    // Para isso, você pode injetar o Router e usar eventos, como no exemplo anterior
  }
}