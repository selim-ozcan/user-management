import {
  Component,
  OnInit,
  ViewChild,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../../auth/user.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from '../../auth/auth.service';
import { Role } from '../../auth/role.enum';
import { Subscription } from 'rxjs';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { UpdateUserComponent } from '../update-user/update-user.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.css',
})
export class UserListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'username'];
  dataSource = new MatTableDataSource<User>([]);
  isLoading = false;
  user: User = null;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private userService: UserService,
    private authService: AuthService,
    public router: Router,
    public route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUsers().subscribe(
      (users) => {
        this.dataSource = new MatTableDataSource<User>(
          users.sort((a, b) => (a.id > b.id ? 1 : -1))
        );
        this.dataSource.paginator = this.paginator;
        this.dataSource._updatePaginator(users.length);

        this.isLoading = false;
      },
      () => {
        this.isLoading = false;
        this.snackBar.open('❕ Error fetching users', null, {
          duration: 3000,
          verticalPosition: 'bottom',
          horizontalPosition: 'right',
          panelClass: ['snackbar-error'],
        });
      }
    );

    this.authService.user.subscribe((user) => {
      this.user = user;
      if (user) {
        if (user.role === Role.Admin) {
          this.displayedColumns = [...this.displayedColumns, 'actions'];
        }
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  onViewDetails(user: User): void {
    this.router.navigate([user.id], { relativeTo: this.route });
  }
}
