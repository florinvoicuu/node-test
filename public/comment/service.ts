import { Injectable } from 'angular2/core';
import { Http, Response, RequestOptions, URLSearchParams } from 'angular2/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';

import { Comment, CommentList } from './model';
import { ObservableUtilities } from '../common/utilities';

@Injectable()
export class CommentService {
    private _uri = 'api/comment';

    constructor (
        private _http: Http,
        private _observable: ObservableUtilities,
        private _options: RequestOptions
    ) {}

    create (comment: Comment): Observable<Comment> {
        return this._http.post(this._uri, JSON.stringify(comment))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    retrieve (id: string): Observable<Comment> {
        return this._http.get(`${this._uri}/${id}`)
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    update (comment: Comment): Observable<Comment> {
        return this._http.put(`${this._uri}/${comment._id}`, JSON.stringify(comment))
            .map(this._observable.json)
            .catch(this._observable.error);
    }

    delete (id: string): Observable<Response> {
        return this._http.delete(`${this._uri}/${id}`)
            .catch(this._observable.error);
    }

    retrieveRange (list: CommentList): Observable<CommentList> {
        let options = this._options;

        let from = (list.page - 1) * list.size;
        let to   = from + list.size;
        options.headers.set('Range', `comments=${from}-${to}`);

        let urlSearchParams = new URLSearchParams;

        for (let param in list.params) {
            if (list.params.hasOwnProperty(param)) {
                urlSearchParams.set(param, list.params[param]);
            }
        }

        options.search.setAll(urlSearchParams);

        return this._http.get(`${this._uri}`, options)
            .map(res => {
                list.items = res.json();
                list.total = Number(res.headers.get('Content-Range').split('/')[1]);
                list.pages = Math.ceil(list.total / list.size);
                return list;
            })
            .catch(this._observable.error);
    }
}
