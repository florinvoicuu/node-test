import { List } from '../common/classes';
import {User} from "../user/model";

export class Comment {
    _id: string;
    user: User;
    content: string;

    constructor() {
        this._id = '';
        this.user =  new User;
        this.content = '';
    }
}

export class CommentList extends List {
    items: Array<Comment>; // Specify Article Object

    constructor () {
        super();
    }
}
