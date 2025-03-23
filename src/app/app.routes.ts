import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {
        path: 'about',
        pathMatch: 'full',
        loadComponent: () => {return import('./about/about.component').then(m => m.AboutComponent)}
    },
    // include page1
    {
        path: 'page1',
        pathMatch: 'full',
        loadComponent: () => {return import('./page1/page1.component').then(m => m.Page1Component)}
    }
];
