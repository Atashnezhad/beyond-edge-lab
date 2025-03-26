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

  signUp() {
    // Simulate sign-up logic
    const isSignedUp = true; // Replace with actual sign-up logic

    if (isSignedUp) {
      alert('Sign-up successful');
      this.router.navigate(['/profile']); // Redirect to profile route after sign-up
    } else {
      // Handle sign-up failure
      alert('Sign-up failed');
    }
  }

  serve() {
    // Implement the serve functionality
    alert('Serve button clicked');
    // Add your serve logic here
  }
}
