import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import  _ from 'underscore';

import { ObservableUtilities } from '../common/utilities';
import { AlertComponent, Alert } from '../directives/alert/component';

import { CommentService } from './service';
import { CommentList, Comment, Badge } from './model';
import { PaginationComponent } from '../directives/pagination/component';
import { CommenterComponent } from "../commenter/component";
import { Commenter } from "../commenter/model";
import { CommenterService } from '../commenter/service'
import { UserService, User } from '../user/component';
import { UserComponent } from '../user/component'




@Component({
    selector: 'comments',
    templateUrl: './comment/index.html',
    directives: [
        PaginationComponent,
        AlertComponent,
        CommenterComponent,
        UserComponent
    ],
    providers: [
        CommentService,
        CommenterService,
        UserService
    ]
})
export class CommentListComponent implements OnInit {
    @ViewChild(AlertComponent) private _alert: AlertComponent;
    user: User = new User;
    list: CommentList = new CommentList;

    comment: Comment = new Comment;

    BADGE_TYPES: Array<string> = ['fa-coffee', 'fa-diamond', 'fa-database'];
    BADGE_COLORS: Array<string> = ['brown', 'red', 'green'];

    private _urlSearchParams: URLSearchParams = new URLSearchParams;

    constructor (
        private _commenter: CommenterService,
        private _user: UserService,
        private _comment: CommentService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    update () {
        this._observable.subscribe(this._comment.retrieveRange(this.list), list => {
            for( let comment  of this.list.items) {
                this._observable.subscribe(this._commenter.retrieve(comment.user._id), commenter => comment.commenter = commenter)
            }
        });
    }

    ngOnInit () {
        let page = this._params.get("page");
        if(page) {
            this.list.page = Number(page);
        }

        // check for size in cookie 'comments-per-page'
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
        this.list.params = _.pick({
            title: this._params.get("title")
        }, _.identity);

        this.update();
    }

    submit () {
        this._observable.subscribe(this._comment.create(this.comment), comment => {
            this.update();
            this.comment.content = '';

            this._alert.add(new Alert('success', 'Comment creat!'));
        });
    }

    size (size: number) {
        // set cookie 'comments-per-page'
    }

    page (page: number) {
        this.list.page = page;
        this._router.navigate(['Comment', _.assign(this._params.params, { page: page })]);
        this.update();
    }

    search () {
        this.list.page = 1;
        this._router.navigate(['Comment', _.pick(this.list.params, _.identity) ]);
    }

    badge (comment: Comment, type: string) {
        this._observable.subscribe(this._comment.badge(comment._id, type), newComment => {
            comment.badges = newComment.badges;
        });
    }

    badges (comment) {
        let badges = [0, 0, 0];

        for (let badge of comment.badges) {
            if (_.contains(this.BADGE_TYPES, badge.type)) {
                badges[_.indexOf(this.BADGE_TYPES, badge.type)]++;
            }
        }

        return badges;
    }
}
