import { Injectable } from 'angular2/core';
import { BaseRequestOptions, URLSearchParams } from 'angular2/http'
import { CookieService } from 'angular2-cookie/core';

@Injectable()
export class ExtendedRequestOptions extends BaseRequestOptions  {
    constructor(private _cookieService: CookieService) {
        super();
        this.headers.set('Content-Type', 'application/json');
        this.headers.set('X-XSRF-TOKEN', this._cookieService.get('XSRF-TOKEN'));
        this.search = new URLSearchParams;
    }
}
