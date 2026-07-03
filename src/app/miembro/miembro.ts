import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { IMiembro } from '../interfaces/imiembro';
import { MiembroService } from '../services/miembro.service';

@Component({
  selector: 'app-miembro',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink,
    DatePipe
  ],
  templateUrl: './miembro.html',
  styleUrl: './miembro.css',
})

export class Miembro implements OnInit {
  miembros: IMiembro[] = []

  constructor(
    private miembroService: MiembroService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
      this.cargar();
  }

  cargar(): void {
    this.miembroService.obtenerTodos().subscribe({
      next: data => {
        this.miembros = [...data];
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

    this.miembroService.eliminar(id).subscribe({
      next: () => this.cargar()
    });

    this.cdr.detectChanges();
  }
}
