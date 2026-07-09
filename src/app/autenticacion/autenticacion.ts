import { Component } from '@angular/core';
import { AutenticacionService } from '../services/autenticacion.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AlertaService } from '../services/alerta.service';

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
    private readonly router: Router,
    private readonly alertaService: AlertaService
  ) { }

  autenticacion(): void {
    this.autenticacionService.ingresar({
      usuario: this.usuario,
      clave: this.clave
    }).subscribe({
      next: (respuesta: any) => {
        localStorage.setItem(
          'usuario',
          JSON.stringify(respuesta)
        );

        this.autenticacionService.actualizarUsuario(
          respuesta
        );

        this.router.navigate(['/menu']);
      },
      error: () => {
        this.alertaService.advertencia('Credenciales Incorrectas');
      }
    });
  }
}
