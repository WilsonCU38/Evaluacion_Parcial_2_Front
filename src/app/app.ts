import { Component, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Encabezado } from './shared/encabezado/encabezado';
import { PiePagina } from './shared/pie-pagina/pie-pagina';
import { AutenticacionService } from './services/autenticacion.service';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    Encabezado,
    PiePagina
  ],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('gimnasio');

  constructor(
    private readonly autenticacionService: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.autenticacionService.vigente()
      .subscribe({
        next: () => { },
        error: () => {
          localStorage.removeItem('usuario');
        }
      });
  }
}
