import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-login',
  imports: [ FormsModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email = '';
  password = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onLogin(): void {
    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.toastr.success('Inicio de sesión exitoso');
        this.router.navigate(['/']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Error al iniciar sesión');
      }
    });
  }
}
