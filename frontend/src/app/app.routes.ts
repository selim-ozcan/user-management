import { Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { UserListComponent } from './management/user-list/user-list.component';
import { CreateUserComponent } from './management/create-user/create-user.component';
import { UpdateUserComponent } from './management/update-user/update-user.component';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard } from './auth/admin.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/users' },
  { path: 'auth', component: AuthComponent },
  {
    path: 'users',
    component: UserListComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'users/create',
    component: CreateUserComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
  {
    path: 'users/:id',
    component: UpdateUserComponent,
    canActivate: [AuthGuard, AdminGuard],
  },
];
