import {User} from "../user/model";
//import {Comment} from "../comment/model";

export class Badge {
    _id: string;
    user: User;
    type: string;
    //comment: string;            //comment: Comment;

    constructor(){
        this._id = '';
        this.user = new User;
        this.type = '';
       // this.comment = '';       //this.comment = new Comment;
    }
}