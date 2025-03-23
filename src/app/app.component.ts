import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/header/header.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, CommonModule],
  template: `
    <div class="app-container">
      <app-header></app-header>
      <main class="main-content">
        <div class="container">
          <router-outlet></router-outlet>
        </div>
      </main>
    </div>
  `,
  styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
    }

    .main-content {
      flex: 1;
      padding: var(--spacing-md) 0;
      background-color: var(--light-color);
    }
  `]
})
export class AppComponent {
  title = 'beyond-edge-lab';
}
