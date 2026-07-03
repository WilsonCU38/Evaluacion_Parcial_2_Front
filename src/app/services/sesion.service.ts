import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ISesionDto } from "../interfaces/isesiondto";
import { Observable } from "rxjs";
import { ISesion } from "../interfaces/isesion";

@Injectable({
  providedIn: 'root'
})
export class SesionService {

  private apiUrl = 'https://localhost:7129/api/ApiSesion';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<ISesionDto[]> {
    return this.http.get<ISesionDto[]>(this.apiUrl);
  }

  obtener(id: number): Observable<ISesion> {
    return this.http.get<ISesion>(`${this.apiUrl}/${id}`);
  }

  crear(sesion: ISesion): Observable<ISesion> {
    return this.http.post<ISesion>(this.apiUrl, sesion);
  }

  editar(id: number, sesion: ISesion): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, sesion);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}