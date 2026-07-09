import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})

export class AlertaService {
    exito(mensaje: string) {
        return Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: mensaje
        });
    }

    error(mensaje: string) {
        return Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje
        })
    }

    advertencia(mensaje: string) {
        return Swal.fire({
            icon: 'warning',
            title: 'Advertencia',
            text: mensaje
        });
    }

    confirmar(mensaje: string) {
        return Swal.fire({
            icon: 'question',
            title: 'Confirmación',
            text: mensaje,
            showCancelButton: true,
            confirmButtonText: 'Si',
            cancelButtonText: 'No',
            confirmButtonColor: '#198754',
            cancelButtonColor: '#dc3545'
        })
    }
}
