import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  score;
  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  isAuth() {
    return this.authService.getToken();
  }



  logout() {
    this.authService.logout();
  }
}
