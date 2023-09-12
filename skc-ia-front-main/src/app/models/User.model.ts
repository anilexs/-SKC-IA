import { Role } from "./role.enum";

export class User {
    constructor(
        public image: string,
        public pseudo: string,
        public id_riot: string,
        public role: Role,
    ) { }
}