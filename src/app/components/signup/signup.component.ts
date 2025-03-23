import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, SignupCredentials } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SignupComponent {
  signupForm: FormGroup;
  error: string = '';
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      full_name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loading = true;
      this.error = '';
      
      const credentials: SignupCredentials = this.signupForm.value;
      
      this.authService.signup(credentials).subscribe({
        next: (user) => {
          this.loading = false;
          if (user) {
            // After successful registration, automatically log in
            this.authService.login({
              username: credentials.email,
              password: credentials.password
            }).subscribe({
              next: (response) => {
                if (response.access_token) {
                  this.router.navigate(['/about']);
                }
              },
              error: (err) => {
                this.error = err.error.detail || 'An error occurred during login';
                this.loading = false;
              }
            });
          }
        },
        error: (err) => {
          this.error = err.error.detail || 'An error occurred during signup';
          this.loading = false;
        }
      });
    }
  }
} 