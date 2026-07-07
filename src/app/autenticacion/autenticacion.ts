import { Component } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-autenticacion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './autenticacion.html',
  styleUrl: './autenticacion.css',
})

export class Autenticacion {
  usuario = '';
  clave = '';

  constructor(
    private readonly autenticacionService: AutenticacionService,
    private readonly router: Router
  ) {}

  autenticacion(){
    this.autenticacionService.ingresar({
      usuario: this.usuario,
      clave: this.clave
    }).subscribe({
      next: () => {
        this.router.navigate(['/menu']);
      },
      error: () =>{
        alert('Credenciales Incorrectas');
      }
    });
  }
}
