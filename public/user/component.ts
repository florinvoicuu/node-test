import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import  _ from 'underscore';

import { AlertComponent, Alert } from '../directives/alert/component';
import { ObservableUtilities } from '../common/utilities';
import { UserService } from './service';
import { User } from './model';
import { CommentListComponent } from '../comment/component';

@Component({
    selector: 'user',
    templateUrl: './user/index.html',
    directives: [
        AlertComponent,
        CommentListComponent
    ],
    providers: [
        UserService
    ]
})
export class UserComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    user: User = new User;
    signup: boolean = false;

    constructor(
        private _user: UserService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    ngOnInit () {
        this.signup = this._params.get('action') === 'signup';
        this._observable.subscribe(this._user.retrieve(), user => this.user = user);
    }

    create () {
        this._observable.subscribe(this._user.create(this.user), user => {
            this._alert.add(new Alert('success', 'Felicitari, te-ai inregistrat!'));
            this._router.navigate(['User', { action: 'comments' }])
        });
    }

    signin () {
        this._observable.subscribe(this._user.signin(this.user), user => this._router.navigate(['Comment']));
    }

    signout () {
        this._user.signout();
        this._router.navigate(['User', { action: 'signin' }]);
    }

    submit () {
        this.signup ? this.create() : this.signin();
    }
}

export { UserService, User };
