import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  loading = false;
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.signupForm = this.fb.group({
      full_name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.loading = true;
      this.error = null;

      this.authService.signup(this.signupForm.value).subscribe({
        next: (user) => {
          // After successful signup, automatically log in
          this.authService.login({
            username: this.signupForm.get('email')?.value,
            password: this.signupForm.get('password')?.value
          }).subscribe({
            next: (response) => {
              if (response.access_token) {
                this.router.navigate(['/profile']);
              }
            },
            error: (err) => {
              this.loading = false;
              this.error = err.error.detail || 'Error logging in after signup';
            }
          });
        },
        error: (err) => {
          this.loading = false;
          this.error = err.error.detail || 'Error creating account';
        }
      });
    }
  }
} 