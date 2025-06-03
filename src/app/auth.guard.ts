import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { DatabaseService } from './services/database.service';

export const authGuard: CanActivateFn = () => {
  const databaseService = inject(DatabaseService);
  const router = inject(Router);

  if (!databaseService.isAutenticado()){

    router.navigate(['/home-page']);
    return false;

  } else {

    return true

  }
};
