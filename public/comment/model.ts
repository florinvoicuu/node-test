import { List } from '../common/classes';
import { User } from '../user/model';

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

    constructor() {
        this._id = '';
        this.user =  new User;
        this.content = '';
        this.badges = [];
    }
}

export class CommentList extends List {
    items: Array<Comment>; // Specify Comment Object
}
