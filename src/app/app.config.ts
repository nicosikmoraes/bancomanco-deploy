import { ApplicationConfig, DEFAULT_CURRENCY_CODE, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http'; // ✅ importe aqui
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }),
     provideRouter(routes),
     provideHttpClient(),

    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' }
  
]
};
