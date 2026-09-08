import { Injectable } from '@angular/core';
import { environment } from '../constants/api.constants';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Auth {
  private authURL = environment.authURL;

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    return this.http.post<{token: string, email: string}>(`${this.authURL}/login`, { email, password })
    .pipe(tap(res => {
      localStorage.setItem('token', res.token);
    }));
  }

  register(name: string, email: string, password: string) {
    return this.http.post(`${this.authURL}/register`, { name, email, password });
  }

  logout(): void{
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    if (!token) return false;

    try{
      const payload = JSON.parse(atob(token.split('.')[1]));
      const isValid = payload.exp * 1000 > Date.now();
      if (!isValid) this.logout();
      return isValid;
    } catch (e) {
      return false;
    }
  }
}
