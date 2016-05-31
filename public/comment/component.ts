import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import  _ from 'underscore';

import { ObservableUtilities } from '../common/utilities';
import { CommentService } from './service';
import { CommentList, Comment } from './model';
import { PaginationComponent } from '../directives/pagination/component';
import { AlertComponent, Alert } from '../directives/alert/component';
import { BadgeComponent } from  '../badge/component';

@Component({
    selector: 'comments',
    templateUrl: './comment/index.html',
    directives: [
        PaginationComponent,
        AlertComponent,
        BadgeComponent
    ],
    providers: [
        CommentService
    ]
})
export class CommentListComponent implements OnInit {
    @ViewChild(AlertComponent) private _alert: AlertComponent;
    list: CommentList = new CommentList;
    comment : Comment = new Comment;

    private _urlSearchParams: URLSearchParams = new URLSearchParams;

    constructor (
        private _comment: CommentService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    update () {
        this._observable.subscribe(this._comment.retrieveRange(this.list));
    }

    ngOnInit () {
        let page = this._params.get("page");
        if(page) {
            this.list.page = Number(page);
        }

    // check for size in cookie 'comments-per-page'

        this.list.params = _.pick({
            title: this._params.get("title")
        }, _.identity);

        this.update();
    }

    submit () {
        this._observable.subscribe(this._comment.create(this.comment), comment => {
            this._alert.add(new Alert('success', 'Felicitari, comment creat!'));
            this.update();
            this.comment.content = '';
        });
    }

size (size: number) {
    // set cookie 'comments-per-page'
}

    page (page) {
        this.list.page = page;
        this._router.navigate(['Comment', _.assign(this._params.params, { page: page })]);
        this.update();
    }

    search () {
        this.list.page = 1;
        this._router.navigate(['Comment', _.pick(this.list.params, _.identity) ]);
    }
}
