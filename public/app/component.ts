import { Component, provide } from 'angular2/core';
import { RouteConfig, ROUTER_PROVIDERS } from 'angular2/router';
import { HTTP_PROVIDERS, RequestOptions } from 'angular2/http';
import { CookieService } from 'angular2-cookie/core';

import { AlertComponent, Alerts } from '../directives/alert/component'
import { UserComponent } from '../user/component';
import { CommenterComponent } from '../commenter/component';
import { CommentListComponent } from '../comment/component';

import { ExtendedRequestOptions } from '../common/extensions';
import { ObservableUtilities } from '../common/utilities';
import { SEO } from '../common/meta';
import {Commenter} from "../commenter/model";

@Component({
    selector: 'app',
    template: `<router-outlet></router-outlet>`,
    styleUrls: [ 'app/style.css' ],
    providers: [
        ROUTER_PROVIDERS,
        HTTP_PROVIDERS,
        provide(RequestOptions, { useClass: ExtendedRequestOptions }),
        CookieService,
        provide(Alerts, { useValue: [] }),
        AlertComponent,
        ObservableUtilities,
        SEO
    ]
})
@RouteConfig([
    {
        path: '/user/:action',
        name: 'User',
        component: UserComponent
    },

    {
        path: '/profile',
        name: 'CommenterprofileId',
        component: CommenterComponent,
      },
    {
        path: '/commenter/:id',
        name: 'CommenterId',
        component: CommenterComponent,
    },
    {
        path: '/',
        name: 'Comment',
        component: CommentListComponent,
        useAsDefault: true
    },


])
export class AppComponent {}
