import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ProfileComponent } from './profile/profile.component'; // Import ProfileComponent
import { AppComponent } from './app.component'; // Import AppComponent
import { HomeComponent } from './home/home.component'; // Import HomeComponent

@NgModule({
  declarations: [
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ProfileComponent, // Import ProfileComponent
    AppComponent, // Import AppComponent
    HomeComponent, // Import HomeComponent
  ],
  providers: []
})
export class AppModule { }