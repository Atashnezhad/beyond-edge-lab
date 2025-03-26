import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component'; // Import ProfileComponent

export const routes: Routes = [ // Export routes
  { path: '', component: HomeComponent },
  { path: 'profile', component: ProfileComponent }, // Add profile route
  // Add a wildcard route to handle undefined routes
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }