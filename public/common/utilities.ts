import { Injectable } from 'angular2/core';
import { Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';

import { AlertComponent, Alert } from '../directives/alert/component';

@Injectable()
export class ObservableUtilities {
    constructor(private _alert: AlertComponent) {}

    subscribe (observable: Observable<any>, callback: ((value: any) => void) = (() => {})) {
        return observable.subscribe(callback, err => {
            this._alert.clear();
            this._alert.add(new Alert('danger', err));
        });
    }

    json (res: Response) {
        let body = res.json();
        return body || {};
    }

    error (res: Response) {
        let error;
        if (!(res instanceof Response)) {
            error = JSON.stringify(res);
        } else if (res.status >= 300) {
            error = 'Unexpected result.';
            if (res.status == 404) {
                error = res.text() || 'Resource not found';
            } else if (res.status == 400) {
                error = res.text() || 'Request could not be processed.';
            } else if (res.status == 401) {
                error = res.text() || 'Not authorized.';
            } else if (res.status == 403) {
                error = "You're not allowed to be here. Contact support for more information.";
            } else if (res.status == 500) {
                error = 'There was a problem with the server; try again later or contact support if the issue persists.';
            }
        }
        return Observable.throw(error);
    }
}
