// src/app/app.config.ts
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations, provideNoopAnimations } from '@angular/platform-browser/animations';
import { MatNativeDateModule } from '@angular/material/core';
import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Detect if we're in development mode
const isDevelopment = true; // In a real app, you'd check env variables

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(withFetch()),
    // For development, we can skip hydration which helps avoid SSR issues
    ...(isDevelopment ? [] : [provideClientHydration()]),
    // Use animations only in the browser to avoid document reference issues
    ...(isDevelopment ? [provideAnimations()] : [provideNoopAnimations()]),
    importProvidersFrom(MatNativeDateModule), provideAnimationsAsync()
  ]
};