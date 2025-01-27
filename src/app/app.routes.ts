import { Routes } from '@angular/router';

export const routes: Routes = [

    {
        path: '',
        pathMatch: 'full',
        loadComponent: () => {return import('./home/home.component').then(m => m.HomeComponent)}
    },
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
