import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Encabezado } from './shared/encabezado/encabezado';
import { PiePagina } from './shared/pie-pagina/pie-pagina';

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
export class App {
  protected readonly title = signal('gimnasio');
}
