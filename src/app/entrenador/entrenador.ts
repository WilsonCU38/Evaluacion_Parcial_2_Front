import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IEntrenador } from '../interfaces/ientrenador';
import { EntrenadorService } from '../services/entrenador.service';

@Component({
  selector: 'app-entrenador',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './entrenador.html',
  styleUrl: './entrenador.css'
})

export class Entrenador implements OnInit {
  entrenadores: IEntrenador[] = [];

  constructor(
    private entrenadorService: EntrenadorService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.entrenadorService.obtenerTodos().subscribe({
      next: data => {
        this.entrenadores = [...data];
        this.cdr.detectChanges();
      },
      error: err => {
        console.error(err);
      }
    });
  }

  eliminar(id: number): void {
    if (!confirm('¿Desea eliminar el registro?')) {
      return;
    }

    this.entrenadorService.eliminar(id).subscribe({
      next: () => this.cargar()
    });

    this.cdr.detectChanges();
  }
}