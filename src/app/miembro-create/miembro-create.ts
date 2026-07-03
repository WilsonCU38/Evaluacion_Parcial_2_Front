import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MiembroService } from '../services/miembro.service';
import { IMiembro } from '../interfaces/imiembro';

@Component({
  selector: 'app-miembro-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './miembro-create.html',
  styleUrl: './miembro-create.css'
})

export class MiembroCreate {

  private readonly miembroService = inject(MiembroService);
  private readonly router = inject(Router);

  miembro: IMiembro = {
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    tipoMembresia: ''
  };

  guardar(): void {
    const miembroEnviar = {
      nombre: this.miembro.nombre,
      apellido: this.miembro.apellido,
      fechaNacimiento: this.miembro.fechaNacimiento,
      tipoMembresia: this.miembro.tipoMembresia
    };

    this.miembroService.crear(miembroEnviar as IMiembro).subscribe({
      next: () => {
        this.router.navigate(['/miembro']);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}
