import { Component, ViewChild, OnInit } from 'angular2/core';
import { Router, RouteParams } from 'angular2/router';

import { AlertComponent, Alert } from '../directives/alert/component';
import { ObservableUtilities } from '../common/utilities';
import { CommenterService } from './service';
import { Commenter } from './model';

@Component({
    selector: 'commenter',
    templateUrl: './commenter/index.html',
    directives: [AlertComponent],
    providers: [
        CommenterService
    ]
})
export class CommenterComponent implements OnInit {
    @ViewChild(AlertComponent) _alert: AlertComponent;
    commenter: Commenter = new Commenter;
    signup = false;

    COMMENTER_BADGE_TYPE: string = '';

    constructor(
        private _commenter: CommenterService, 
        private _router: Router, 
        private _params: RouteParams,
        private _observable: ObservableUtilities
    ) {}

    ngOnInit () {
        let id = this._params.get('id');
        if (id) {
            this._observable.subscribe(this._commenter.retrieve(id), commenter => this.commenter = commenter);
        } else {
            this.signup = true;
        }
    }

    create () {
        this._observable.subscribe(this._commenter.create(this.commenter), user => {
            this._alert.add(new Alert('success', 'Esti un Commenter!'));
            this._router.navigate(['User', { action: 'commenter' }])
        });
    }

    update () {
        this._observable.subscribe(this._commenter.update(this.commenter), user => {
            this._alert.add(new Alert('success', 'Modificat cu succes!'));
            this._router.navigate(['User', { action: 'commenter' }])
        });
    }

    submit () {
        this.signup ? this.create() : this.update();
    }
}

export { CommenterService, Commenter };
