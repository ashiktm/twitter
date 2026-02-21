import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  showLogoutMenu: boolean = false;

  constructor(private router: Router) { }

  logout() {
    sessionStorage.removeItem('jwtToken');
    sessionStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
