import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { AlertaService } from '../../services/alerta.service';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './encabezado.html',
  styleUrl: './encabezado.css'
})
export class Encabezado implements OnInit {
  autenticado = false;
  rol = 0;

  constructor(
    private readonly autenticacionService: AutenticacionService,
    private readonly router: Router,
    private readonly alertaService: AlertaService,
    private readonly cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.autenticacionService.usuario$
      .subscribe(usuario => {
        this.autenticado = !!usuario;
        this.rol = Number(usuario?.rol ?? 0);
        this.cdr.detectChanges();
      });
  }

  salir(): void {
    this.alertaService.confirmar('¿Desea cerrar sesión?')
      .then((resultado) => {
        if (!resultado.isConfirmed) {
          return;
        }

        this.autenticacionService.salir()
          .subscribe({
            next: () => {
              this.router.navigate(['/']);
            }
          });
      })
  }
}