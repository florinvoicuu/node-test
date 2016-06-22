import { Injectable } from 'angular2/core';
import { Http, Response } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import { Comment } from '../comment/model';
import { Commenter } from './model';
import { ObservableUtilities } from '../common/utilities';

@Injectable()
export class CommenterService {
    private _uri = 'api/commenter';

    constructor (
        private _http: Http,
        private _observable: ObservableUtilities
    ) {}

    create (commenter: Commenter): Observable<Commenter> {
        return this._http.post(`${this._uri}/${commenter._id}`, JSON.stringify(commenter))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    retrieve (id: string): Observable<Commenter> {
        return this._http.get(`${this._uri}/${id}`)
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    update (commenter: Commenter): Observable<Commenter> {
        return this._http.put(`${this._uri}/${commenter._id}`, JSON.stringify(commenter))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    delete (id: string): Observable<Response> {
        return this._http.delete(`${this._uri}/${id}`)
            .catch(this._observable.error);
    }
        
}
