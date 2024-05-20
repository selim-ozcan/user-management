import { Component } from '@angular/core';
import { User } from '../../auth/user.model';
import { Role } from '../../auth/role.enum';

import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrl: './create-user.component.css',
})
export class CreateUserComponent {
  isLoading = false;
  roles = Object.values(Role);
  user: User = new User();
  errors: string[] = [];

  constructor(
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.user.role = Role.User;
  }

  createUser() {
    this.isLoading = true;
    this.userService.createUser(this.user).subscribe(
      () => {
        this.isLoading = false;
        this.errors = [];
        this.snackBar.open('✅ Successfully created user!', null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success'],
        });
        this.router.navigate(['/users']);
      },
      (error) => {
        this.errors = error.error.message;
        this.snackBar.open('❕ Error creating user', null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error'],
        });
        this.isLoading = false;
      }
    );
  }
}
