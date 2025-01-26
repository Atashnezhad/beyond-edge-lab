import { Component } from '@angular/core';
import { LoginComponent } from "../components/login/login.component";

@Component({
  selector: 'app-home',
  imports: [LoginComponent, LoginComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
