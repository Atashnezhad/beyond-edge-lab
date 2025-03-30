import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component'; // Import ProfileComponent
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [ // Export routes
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent }, // Add profile route
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  // Add a wildcard route to handle undefined routes
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }