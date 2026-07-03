import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ISesionDto } from '../interfaces/isesiondto';
import { SesionService } from '../services/sesion.service';

@Component({
  selector: 'app-sesion',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './sesion.html',
  styleUrl: './sesion.css'
})

export class Sesion implements OnInit {
  sesiones: ISesionDto[] = [];

  constructor(
    private sesionService: SesionService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.cargar();
  }

  cargar(): void {
    this.sesionService.obtenerTodos().subscribe({
      next: data => {
        this.sesiones = [...data];
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

    this.sesionService.eliminar(id).subscribe({
      next: () => this.cargar()
    });

    this.cdr.detectChanges();
  }
}