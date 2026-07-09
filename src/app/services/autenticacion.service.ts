import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAutenticacion } from "../interfaces/iautenticacion";
import { BehaviorSubject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {

  private api = 'https://localhost:7129/api/ApiAutenticacion';
  private usuarioSubject = new BehaviorSubject<any>(
    this.obtenerUsuario()
  );

  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) { }

  ingresar(data: IAutenticacion) {
    return this.http.post(`${this.api}/ingresar`, data, { withCredentials: true });
  }

  salir() {
    localStorage.removeItem('usuario');

    this.actualizarUsuario(null);

    return this.http.post(`${this.api}/salir`, {}, { withCredentials: true });
  }

  vigente() {
    return this.http.get(`${this.api}/vigente`, { withCredentials: true });
  }

  obtenerUsuario() {
    const usuario = localStorage.getItem('usuario');

    return usuario ? JSON.parse(usuario) : null;
  }

  estaAutenticado(): boolean {
    return !!this.obtenerUsuario();
  }

  obtenerRol(): number {
    return Number(this.obtenerUsuario()?.rol ?? 0);
  }

  actualizarUsuario(usuario: any): void {
    this.usuarioSubject.next(usuario);
  }
}