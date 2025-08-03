import { Component, OnInit } from '@angular/core';
import { OidcSecurityService } from 'angular-auth-oidc-client';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports:[CommonModule]
})
export class AppComponent implements OnInit {
  isAuthenticated = false;
  userData: any;

  constructor(public oidcSecurityService: OidcSecurityService) {}

ngOnInit() {
  this.oidcSecurityService.checkAuth().subscribe({
    next: ({ isAuthenticated, userData, accessToken }) => {
      console.log('Auth result:', { isAuthenticated, userData, accessToken });
    },
    error: (err) => {
      console.error('Authentication error:', err);
      if (err.error) console.error('Error details:', err.error);
    }
  });
} 

  login() {
    this.oidcSecurityService.authorize();
  }

  logout() {
    this.oidcSecurityService.logoff().subscribe(() => {
      this.isAuthenticated = false;
      this.userData = null;
    });
  }
}