import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';
  sessionTimeout: any;  // Variable para manejar el temporizador de sesión

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    const authUrl = 'http://148.113.200.159:8080/users/login';
    const payload = {
      username: username,
      password: password
    };

    this.http.post(authUrl, payload).subscribe(
      (result: any) => {
        if (result.username === 'gest') {
          this.router.navigate(['/marcaje']);
          this.startSessionTimer();  // Iniciar temporizador tras login exitoso
        } else if (result.username === 'admin') {
          this.router.navigate(['/admin']);
        } else {
          this.errorMessage = 'Nombre de usuario o contraseña incorrectos.';
        }
      },
      (error) => {
        this.errorMessage = 'Error al intentar iniciar sesión. Inténtalo de nuevo.';
      }
    );
  }

  // Función para cerrar sesión
  logout(): void {
    clearTimeout(this.sessionTimeout); // Limpiar el temporizador si la sesión se cierra manualmente
    // Aquí puedes agregar cualquier lógica adicional para cerrar sesión en el backend
    this.router.navigate(['/login']);  // Redirigir a la página de login
  }

  // Temporizador de sesión de 30 minutos
  startSessionTimer(): void {
    clearTimeout(this.sessionTimeout);  // Limpiar cualquier temporizador anterior
    this.sessionTimeout = setTimeout(() => {
      this.logout();  // Cerrar sesión automáticamente después de 30 minutos
    }, 30 * 60 * 1000);  // 30 minutos en milisegundos
  }

  // Cuando el empleado marca, cerrar sesión automáticamente
  onMark(): void {
    this.logout();  // Forzar el cierre de sesión tras el marcaje
  }
}
