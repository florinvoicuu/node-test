import { User } from '../user/model';

export class Commenter {
    _id:         string;
    user:          User;
    name:        string;
    description: string;
    image:       string;
    badge:       string;

    constructor() {
        this._id = '';
        this.user =  new User;
        this.name = '';
        this.description = '';
        this.image = '';
        this.badge = '';
    }
}
