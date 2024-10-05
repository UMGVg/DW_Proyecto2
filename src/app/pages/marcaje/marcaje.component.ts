import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marcaje',
  templateUrl: './marcaje.component.html',
  styleUrls: ['./marcaje.component.scss']
})
export class MarcajeComponent implements OnInit {

  currentDate: string = '';
  currentTime: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.updateClock();
    setInterval(() => this.updateClock(), 1000); // Actualiza la hora cada segundo
  }

  updateClock() {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    this.currentDate = `${day}/${month}/${year}`;

    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    this.currentTime = `${hours}:${minutes}:${seconds}`;
  }

  // Envía la fecha y hora al servidor
  sendDateTimeToDatabase() {
    const data = {
      id: 2, // Puedes ajustar el ID según sea necesario
      Value: `${this.currentDate} ${this.currentTime}`
    };

    this.http.post('http://148.113.200.159:8080/:id/entry', data)
      .subscribe(
        response => {
          console.log('Fecha y hora guardadas exitosamente:', response);
          this.logout(); // Cierra sesión tras marcaje exitoso
        },
        error => {
          console.error('Error al guardar la fecha y hora:', error);
        }
      );
  }

  // Redirige a la página de inicio de sesión al cerrar sesión
  logout() {
    // Aquí puedes agregar lógica para notificar al backend si es necesario
    this.router.navigate(['/login']);
  }

}
