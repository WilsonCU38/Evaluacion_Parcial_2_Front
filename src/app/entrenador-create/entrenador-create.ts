import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IEntrenador } from '../interfaces/ientrenador';
import { EntrenadorService } from '../services/entrenador.service';

@Component({
  selector: 'app-entrenador-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './entrenador-create.html',
  styleUrl: './entrenador-create.css'
})

export class EntrenadorCreate {
  private readonly entrenadorService = inject(EntrenadorService);
  private readonly router = inject(Router);

  entrenador: IEntrenador = {
    nombre: '',
    especialidad: '',
    telefono: '',
    email: ''
  };

  guardar(): void {
    this.entrenadorService.crear(this.entrenador).subscribe({
      next: () => {
        this.router.navigate(['/entrenador']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}