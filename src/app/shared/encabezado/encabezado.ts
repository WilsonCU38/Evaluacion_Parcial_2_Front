import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css'
})
export class Encabezado {

  constructor(
    private readonly autenticacionService: AutenticacionService,
    private readonly router: Router
  ) {}

  salir(): void {

    if (!confirm('¿Desea cerrar sesión?')) {
      return;
    }

    this.autenticacionService.salir()
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        }
      });
  }
}