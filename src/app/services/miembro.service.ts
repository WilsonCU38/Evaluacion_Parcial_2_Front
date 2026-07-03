import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IMiembro } from '../interfaces/imiembro';

@Injectable({
  providedIn: 'root'
})

export class MiembroService {

  private apiUrl = 'https://localhost:7129/api/ApiMiembro';

  constructor(private http: HttpClient) {}

  obtenerTodos(): Observable<IMiembro[]> {
    return this.http.get<IMiembro[]>(this.apiUrl);
  }

  obtener(id: number): Observable<IMiembro> {
    return this.http.get<IMiembro>(`${this.apiUrl}/${id}`);
  }

  crear(miembro: IMiembro): Observable<IMiembro> {
    return this.http.post<IMiembro>(this.apiUrl, miembro);
  }

  editar(id: number, miembro: IMiembro): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, miembro);
  }

  eliminar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}