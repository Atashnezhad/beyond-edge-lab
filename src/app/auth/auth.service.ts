import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private signedIn = new BehaviorSubject<boolean>(false);
  userSignedIn = this.signedIn.asObservable();

  signIn() {
    // ...existing code...
    this.signedIn.next(true);
  }

  signOut() {
    // ...existing code...
    this.signedIn.next(false);
  }

  get isSignedIn(): boolean {
    return this.signedIn.value;
  }

  getCurrentSignInStatus(): boolean {
    return this.signedIn.value;
  }
}