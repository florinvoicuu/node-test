import { List } from '../common/classes';
import { User } from '../user/model';
import  { Commenter } from '../commenter/model';

export class Badge {
    user: string;
    type: string;
    comment: string;

    constructor() {
        this.user = '';
        this.type = '';
        this.comment = '';
    }
}

export class Comment {
    _id: string;
    user: User;
    content: string;
    badges: Array<Badge>;
    commenter: Commenter;

    constructor() {
        this._id = '';
        this.user =  new User;
        this.content = '';
        this.badges = [];
        this.commenter = new Commenter;
    }
}

export class CommentList extends List {
    items: Array<Comment>; // Specify Comment Object
}
