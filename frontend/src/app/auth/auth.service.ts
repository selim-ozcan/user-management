import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { User } from './user.model';
import { Role } from './role.enum';
import { Router } from '@angular/router';

export interface AuthResponse {
  username: string;
  id: number;
  firstName: string;
  lastName: string;
  role: Role;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  baseUrl: string = 'http://localhost:3004';

  constructor(private http: HttpClient, private router: Router) {
    const user = JSON.parse(localStorage.getItem('user'));

    this.user.next(user);
  }

  login(username: string, password: string) {
    return this.http
      .post<AuthResponse>(
        this.baseUrl + '/auth/login',
        {
          username,
          password,
        },
        { withCredentials: true }
      )
      .pipe(
        tap((response) => {
          const user = new User();
          user.username = response.username;
          (user.id = Number(response.id)), (user.role = response.role);
          user.firstName = response.firstName;
          user.lastName = response.lastName;

          localStorage.setItem('user', JSON.stringify(user));
          this.user.next(user);
        })
      );
  }

  logout() {
    localStorage.removeItem('user');
    this.user.next(null);
    this.router.navigate(['/auth']);
  }
}
