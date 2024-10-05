import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TcRoleService } from '../../services/tc-role.service';
import { TcRole } from '../../models/tc-role';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

  authService = inject(AuthService);
  tcRoleService = inject(TcRoleService);
  router = inject(Router);
  dataRole: TcRole[];

  public logout(){
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  clickEvent() {
    this.tcRoleService.getAll().subscribe((data: any) => {
      this.dataRole = data.data.data;
    });
  }

}
