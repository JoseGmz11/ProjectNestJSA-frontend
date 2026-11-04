import { Component, signal } from '@angular/core';
import { RouterOutlet, RouterModule, Router} from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Auth } from './services/auth';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('frontend');

  constructor(
    public auth: Auth,
    private router: Router,
  ) {}

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
