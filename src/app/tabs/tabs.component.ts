import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  // styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {
  tabName: string = 'Home';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.userSignedIn.subscribe(signedIn => {
      if (signedIn) {
        this.tabName = 'Profile';
      } else {
        this.tabName = 'Home';
      }
    });

    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        if (event.url === '/profile' && this.authService.isSignedIn) {
          this.tabName = 'Profile';
        } else {
          this.tabName = 'Home';
        }
      }
    });
  }
}
