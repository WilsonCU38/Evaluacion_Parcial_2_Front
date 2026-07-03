import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IEntrenador } from '../interfaces/ientrenador';
import { EntrenadorService } from '../services/entrenador.service';

@Component({
  selector: 'app-entrenador-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './entrenador-edit.html',
  styleUrl: './entrenador-edit.css'
})

export class EntrenadorEdit implements OnInit {
  private readonly entrenadorService = inject(EntrenadorService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  id = 0;

  entrenador: IEntrenador = {
    entrenadorId: 0,
    nombre: '',
    especialidad: '',
    telefono: '',
    email: ''
  };

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('entrenadorId'));

    this.entrenadorService.obtener(this.id).subscribe({
      next: (data) => {

        this.entrenador = data;

        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  guardar(): void {
    this.entrenadorService.editar(this.id, this.entrenador).subscribe({
      next: () => {
        this.router.navigate(['/entrenador']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}