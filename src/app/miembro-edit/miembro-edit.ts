import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { MiembroService } from '../services/miembro.service';
import { IMiembro } from '../interfaces/imiembro';

@Component({
  selector: 'app-miembro-edit',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './miembro-edit.html',
  styleUrl: './miembro-edit.css'
})
export class MiembroEdit implements OnInit {

  private readonly miembroService = inject(MiembroService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly cdr = inject(ChangeDetectorRef);

  id = 0;

  miembro: IMiembro = {
    miembroId: 0,
    nombre: '',
    apellido: '',
    fechaNacimiento: '',
    tipoMembresia: ''
  };

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('miembroId'));

    this.miembroService.obtener(this.id).subscribe({
      next: (data) => {
        this.miembro = {
          ...data,
          fechaNacimiento: data.fechaNacimiento ? data.fechaNacimiento.split('T')[0] : ''
        }
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
      }
    });
  }

  guardar(): void {
    this.miembroService.editar(this.id, this.miembro).subscribe({
      next: () => {
        this.router.navigate(['/miembro']);
      },
      error: (err) => {
        console.error(err);
      }
    });
  }
}