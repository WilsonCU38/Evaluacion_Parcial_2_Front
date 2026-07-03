import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IEntrenador } from '../interfaces/ientrenador';

@Injectable({
    providedIn: 'root'
})

export class EntrenadorService {

    private apiUrl = 'https://localhost:7129/api/ApiEntrenador';

    constructor(private http: HttpClient) { }

    obtenerTodos(): Observable<IEntrenador[]> {
        return this.http.get<IEntrenador[]>(this.apiUrl);
    }

    obtener(id: number): Observable<IEntrenador> {
        return this.http.get<IEntrenador>(`${this.apiUrl}/${id}`);
    }

    crear(entrenador: IEntrenador): Observable<IEntrenador> {
        return this.http.post<IEntrenador>(this.apiUrl, entrenador);
    }

    editar(id: number, entrenador: IEntrenador): Observable<any> {
        return this.http.put(`${this.apiUrl}/${id}`, entrenador);
    }

    eliminar(id: number): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
