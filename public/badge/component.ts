import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';
import { URLSearchParams } from 'angular2/http';
import  _ from 'underscore';

import { ObservableUtilities } from '../common/utilities';
import { BadgeService } from './service';
import { Badge } from './model';
import { PaginationComponent } from '../directives/pagination/component';
import { AlertComponent, Alert } from '../directives/alert/component';

@Component({
    selector: 'badge',
    templateUrl: './badge/index.html',
    directives: [
        PaginationComponent,
        AlertComponent
    ],
    providers: [
        BadgeService
    ]
})
export class BadgeComponent implements OnInit {
    @ViewChild(AlertComponent) private _alert: AlertComponent;
        badge : Badge = new Badge;


    constructor (
        private _badge: BadgeService,
        private _router: Router,
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    create () {   //click tre implementat cred
        this._observable.subscribe(this._badge.create(this.badge), badge => {
            this._alert.add(new Alert('success', 'Felicitari, badge creat!'));

            this.badge.type = '';
        });
    }

    update () {
        this._observable.subscribe(this._badge.update(this.badge), badge => {
            this._alert.add(new Alert('success', 'Modificat cu succes!'));
            this._router.navigate(['Comment']);
        });
    }

    delete () {
        this._observable.subscribe(this._badge.delete(this.badge._id), () => {
            this._alert.add(new Alert('success', 'Badge sters cu succes!'));
            this._router.navigate(['Comment']);
        });
    }
}
