import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IAutenticacion } from "../interfaces/iautenticacion";

@Injectable({
  providedIn:'root'
})
export class AutenticacionService {

  private api = 'https://localhost:7129/api/ApiAutenticacion';

  constructor(private http:HttpClient) {}

  ingresar(data:IAutenticacion){
      return this.http.post(`${this.api}/ingresar`,data);
  }

  salir(){
      return this.http.post(`${this.api}/salir`,{});
  }

  vigente(){
      return this.http.get(`${this.api}/vigente`);
  }
}