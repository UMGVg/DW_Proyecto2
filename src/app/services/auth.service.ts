import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Global } from './global.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  httpClient = inject(HttpClient);

  constructor() { }

  // Método para registro de usuarios
  signup(data: any) {
    return this.httpClient.post(`${Global.url}/user/register`, data);
  }

  // Método para inicio de sesión
  login(data: any) {
    // Cifrado de la contraseña en base64, como en el código original
    data.password = btoa(data.password as any);

    // Realiza la petición POST a la API para autenticación
    return this.httpClient.post(`${Global.url}/user/login`, data)
      .pipe(tap((result: any) => {
        // Si la autenticación es exitosa, guarda el resultado en localStorage
        if (result && result.username) {
          localStorage.setItem('authUser', JSON.stringify(result));
        }
      }));
  }

  // Método para cerrar sesión
  logout() {
    // Elimina los datos de autenticación del almacenamiento local
    localStorage.removeItem('authUser');
  }

  // Verifica si el usuario ha iniciado sesión
  isLoggedIn(): boolean {
    // Comprueba si los datos de autenticación existen en localStorage
    return localStorage.getItem('authUser') !== null;
  }

  // Devuelve los datos de usuario logueado almacenados en localStorage
  loginData(): any {
    let data: any = localStorage.getItem('authUser');
    return JSON.parse(data);
  }

}
