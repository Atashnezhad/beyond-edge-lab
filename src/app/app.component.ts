import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main>
      <router-outlet></router-outlet>
    </main>    
  `,
  styles: [
    `
      main {
        padding: 16px;
      }
    `,
  ],
})
export class AppComponent {
  title = 'beyond-edge-lab';
}
