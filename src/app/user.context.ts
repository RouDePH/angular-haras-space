import { signal, Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UserContext {
  user = signal<{ name: string } | null>(null);

  setUser(user: { name: string }) {
    this.user.set(user);
  }
}