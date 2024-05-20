import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { User } from '../../auth/user.model';
import { UserService } from '../user.service';
import { Role } from '../../auth/role.enum';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'update-user.component.ts',
  templateUrl: 'update-user.component.html',
  styleUrl: 'update-user.component.css',
})
export class UpdateUserComponent implements OnInit {
  isLoading = false;
  roles = Object.values(Role);
  user: User = null;
  currentUser: User = null;
  errors: string[] = [];

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.userService.getUser(+id).subscribe((user) => {
      this.user = user;
      this.isLoading = false;
    });
    this.authService.user.subscribe(
      (currentUser) => (this.currentUser = currentUser)
    );
  }

  updateUser() {
    this.isLoading = true;
    if (this.user.password === '') this.user.password = undefined;
    this.userService.updateUser(this.user).subscribe(
      () => {
        this.isLoading = false;
        this.errors = [];
        this.snackBar.open('✅ Successfully updated user!', null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success'],
        });
      },
      (error) => {
        this.errors = error.error.message;
        this.snackBar.open('❕ Error updating user', null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error'],
        });
        this.isLoading = false;
      }
    );
  }

  deleteUser() {
    this.isLoading = true;
    this.userService.deleteUser(this.user.id).subscribe(
      () => {
        this.snackBar.open('✅ Successfully deleted user!', null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-success'],
        });
        this.userService.getUsers();
        this.router.navigate(['/users']);
        this.isLoading = false;
      },
      (error) => {
        this.errors = error.error.message;
        this.snackBar.open('❕ Error deleting user', null, {
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
