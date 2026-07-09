import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AutenticacionService } from '../services/autenticacion.service';
import { catchError, map, of } from 'rxjs';
import { AlertaService } from '../services/alerta.service';

export const autenticacionGuard: CanActivateFn = () => {
  const autenticacionService = inject(AutenticacionService);
  const router = inject(Router);
  const alertaService = inject(AlertaService);

  return autenticacionService.vigente().pipe(
    map(() => true),
    catchError(() => {
      alertaService.advertencia('Por favor, inicie sesión')
      router.navigate(['/']);
      return of(false);
    })
  );
};
