import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { IEntrenador } from '../interfaces/ientrenador';
import { IMiembro } from '../interfaces/imiembro';
import { ISesion } from '../interfaces/isesion';
import { EntrenadorService } from '../services/entrenador.service';
import { MiembroService } from '../services/miembro.service';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-sesion-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './sesion-edit.html',
  styleUrl: './sesion-edit.css'
})
export class SesionEdit implements OnInit {

  private readonly sesionService = inject(SesionService);
  private readonly miembroService = inject(MiembroService);
  private readonly entrenadorService = inject(EntrenadorService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  id = 0;

  miembros: IMiembro[] = [];
  entrenadores: IEntrenador[] = [];

  sesion: ISesion = {
    sesionId: 0,
    miembroId: 0,
    entrenadorId: 0,
    fechaSesion: '',
    observacion: ''
  };

  ngOnInit(): void {

    this.id = Number(this.route.snapshot.paramMap.get('sesionId'));

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

    this.sesionService.obtener(this.id).subscribe({
      next: data => {

        this.sesion = {
          ...data,
          fechaSesion: data.fechaSesion
            ? data.fechaSesion.split('T')[0]
            : ''
        };

        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
      }
    });

  }

  guardar(): void {

    this.sesionService.editar(this.id, this.sesion).subscribe({
      next: () => {
        this.router.navigate(['/sesion']);
      },
      error: err => {
        console.error(err);
      }
    });

  }

}