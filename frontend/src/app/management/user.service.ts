import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../auth/user.model';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  users = new BehaviorSubject<User[]>([]);
  baseUrl: string = 'http://localhost:3004';

  constructor(private http: HttpClient) {}

  createUser(user: User) {
    return this.http.post(this.baseUrl + '/users', user, {
      withCredentials: true,
    });
  }

  getUsers() {
    return this.http
      .get<User[]>(this.baseUrl + '/users', {
        withCredentials: true,
      })
      .pipe(
        tap((users) => {
          this.users.next(users);
        })
      );
  }

  deleteUser(id: number) {
    return this.http.delete(this.baseUrl + `/users/${id}`, {
      withCredentials: true,
    });
  }

  updateUser(user: User) {
    return this.http.patch(this.baseUrl + `/users/${user.id}`, user, {
      withCredentials: true,
    });
  }

  getUser(id: number) {
    return this.http.get<User>(this.baseUrl + `/users/${id}`, {
      withCredentials: true,
    });
  }
}
