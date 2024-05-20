import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
})
export class AuthComponent {
  isLoading = false;
  error: string = null;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;

    this.authService.login(username, password).subscribe(
      (response) => {
        this.isLoading = false;
        this.router.navigate(['/users']);
      },
      (error) => {
        this.error = error.error.message;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
