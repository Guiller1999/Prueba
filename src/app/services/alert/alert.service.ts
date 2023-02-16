import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor() {}

  showSuccessMessage(title: string, text: string): void {
    Swal.fire({
      icon: 'success',
      title,
      text,
    });
  }

  showErrorMessage(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
    });
  }
}
