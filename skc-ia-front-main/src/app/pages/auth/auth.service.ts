import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Role } from 'src/app/models/role.enum';
import { User } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public userConnected!: User;

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(
    private router: Router
  ) {
    this.userConnected = {
      pseudo: "Pred",
      id_riot: "SKC Alien#0IA1",
      image: "pred.png",
      role: Role['fondateur']
    }
  }

  login(mail: string, mdp: string) {
    if (mail !== '' && mdp !== '') {
      this.userConnected = {
        pseudo: "Pred",
        id_riot: "SKC Alien#0IA1",
        image: "pred.png",
        role: Role['fondateur']
      }
      this.loggedIn.next(true);
      this.router.navigate(['/']);
    }
  }

  logout() {
    this.loggedIn.next(false);
    this.router.navigate(['/connexion']);
  }
}
