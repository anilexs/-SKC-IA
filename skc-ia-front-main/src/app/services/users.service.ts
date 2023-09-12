import { Injectable } from '@angular/core';
import { Role } from '../models/role.enum';
import { User } from '../models/User.model';

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    public contactsData: User[] = [];

    constructor() {
        this.contactsData = [
            {
                id_riot: "Neilerua13#EUW",
                image: 'assets/img/profil/pred.png',
                pseudo: 'Neil',
                role: Role.admin
            },
            {
                id_riot: "Random1#1234",
                image: 'assets/img/profil/pred.png',
                pseudo: 'Random Coach',
                role: Role.coach
            },
            {
                id_riot: "Random2#5678",
                image: 'assets/img/profil/pred.png',
                pseudo: 'Random Membre',
                role: Role.membre
            },
            {
                id_riot: "Random3#9999",
                image: 'assets/img/profil/pred.png',
                pseudo: 'Random Invité',
                role: Role.invite
            },
            {
                id_riot: "Pred#BOSS",
                image: 'assets/img/profil/pred.png',
                pseudo: 'Pred',
                role: Role.fondateur
            }
        ];
    }

    createUser(user: User) {
        this.contactsData.push(user);
        this.contactsData = [...this.contactsData];
    }

    updateUser(user: User) {
        const index: number = this.contactsData.findIndex(u => u.pseudo !== user.pseudo);
        this.contactsData[index - 1] = user;
    }

    deleteUser(user: User) {
        this.contactsData = this.contactsData.filter(u => u.pseudo !== user.pseudo);
    }
}
