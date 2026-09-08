import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Auth } from '../../services/auth';

@Component({
  selector: 'app-register',
  imports: [ FormsModule, RouterModule ],
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register {
  name = '';
  email = ''
  password = '';
  
  constructor(
    private authService: Auth,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onRegister(): void {
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: () => {
        this.toastr.success('Registro exitoso');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        this.toastr.error(err.error.message || 'Error al registrar usuario');
      }
    });
  }
}
