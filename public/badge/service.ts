import { Injectable } from 'angular2/core';
import { Http, Response, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Badge } from './model';
import { ObservableUtilities } from '../common/utilities';

@Injectable()
export class BadgeService {
    private _uri = 'api/badge';

    constructor (
        private _http: Http,
        private _observable: ObservableUtilities,
        private _options: RequestOptions
    ) {}

    create (badge: Badge): Observable<Badge> {
        return this._http.post(this._uri, JSON.stringify(badge))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    retrieve (id: string): Observable<Badge> {
        return this._http.get(`${this._uri}/${id}`)
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    update (badge: Badge): Observable<Badge> {
        return this._http.put(`${this._uri}/${badge._id}`, JSON.stringify(badge))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    delete (id: string): Observable<Response> {
        return this._http.delete(`${this._uri}/${id}`)
            .catch(this._observable.error);
    }
    
}
