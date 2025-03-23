import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  template: `
    <header class="header">
      <div class="container">
        <div class="header-content">
          <div class="logo">
            <a routerLink="/">Beyond Edge Lab</a>
          </div>
          <nav class="nav-menu">
            <a routerLink="/" routerLinkActive="active" [routerLinkActiveOptions]="{exact: true}">Home</a>
            <a routerLink="/about" routerLinkActive="active">About</a>
            <a routerLink="/page1" routerLinkActive="active">Services</a>
          </nav>
        </div>
      </div>
    </header>
  `,
  styles: [`
    .header {
      background-color: var(--primary-color);
      padding: var(--spacing-md) 0;
      box-shadow: var(--box-shadow-sm);
    }

    .header-content {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .logo {
      a {
        color: white;
        font-size: 1.5rem;
        font-weight: bold;
        text-decoration: none;
      }
    }

    .nav-menu {
      display: flex;
      gap: var(--spacing-md);

      a {
        color: rgba(255, 255, 255, 0.8);
        text-decoration: none;
        padding: var(--spacing-xs) var(--spacing-sm);
        border-radius: var(--border-radius);
        transition: all 0.3s ease;

        &:hover, &.active {
          color: white;
          background-color: rgba(255, 255, 255, 0.1);
        }
      }
    }
  `]
})
export class HeaderComponent {} 