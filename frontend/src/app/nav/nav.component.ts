import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
})
export class NavComponent implements OnInit {
  user: User;

  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.authService.user.subscribe((user) => {
      this.user = user;
    });
  }
}
