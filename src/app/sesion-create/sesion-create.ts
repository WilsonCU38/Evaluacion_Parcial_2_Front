import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { IEntrenador } from '../interfaces/ientrenador';
import { IMiembro } from '../interfaces/imiembro';
import { ISesion } from '../interfaces/isesion';
import { EntrenadorService } from '../services/entrenador.service';
import { MiembroService } from '../services/miembro.service';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-sesion-create',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './sesion-create.html',
  styleUrl: './sesion-create.css'
})

export class SesionCreate implements OnInit {
  private readonly sesionService = inject(SesionService);
  private readonly miembroService = inject(MiembroService);
  private readonly entrenadorService = inject(EntrenadorService);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  miembros: IMiembro[] = [];
  entrenadores: IEntrenador[] = [];

  sesion: ISesion = {
    miembroId: 0,
    entrenadorId: 0,
    fechaSesion: '',
    observacion: ''
  };

  ngOnInit(): void {
    this.miembroService.obtenerTodos().subscribe({
      next: data => {
        this.miembros = data;
        this.cdr.detectChanges();
      }
    });

    this.entrenadorService.obtenerTodos().subscribe({
      next: data => {
        this.entrenadores = data;
        this.cdr.detectChanges();
      }
    });
  }

  guardar(): void {
    this.sesionService.crear(this.sesion).subscribe({
      next: () => {
        this.router.navigate(['/sesion']);
      },
      error: err => {
        console.error(err);
      }
    });
  }
}