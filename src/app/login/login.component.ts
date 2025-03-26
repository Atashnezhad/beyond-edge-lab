import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private router: Router) {}

  login() {
    // Simulate login logic
    const isAuthenticated = true; // Replace with actual authentication logic

    if (isAuthenticated) {
      this.router.navigate(['/profile']); // Redirect to profile route
    } else {
      // Handle login failure
      alert('Login failed');
    }
  }
}
