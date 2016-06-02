import { Component, Input, Output, EventEmitter, OnInit } from 'angular2/core';
import { RouteParams } from 'angular2/router';
import  _ from 'underscore';
import { CommentListComponent } from  '../../comment/component';

import { List } from '../../common/classes';

@Component({
    selector: 'pagination',
    templateUrl: './directives/pagination/index.html'
})
export class PaginationComponent implements OnInit {
    @Input() list: List;
    @Output() change  = new EventEmitter<number>();

    pages: Array<number> = [];

    constructor(
        private _params: RouteParams
    ) {}

    ngOnInit () {
        this.pages = _.range(1, this.list.pages + 1);
    }

    onClick (page: number) {
        if (page > 0 && page <= this.list.pages) {
            this.change.emit(page);
        }
        return false;
    }

    href (page: number) {
        return `${window.location.pathname}?${_.map(_.assign(this._params.params, { page: page }), (value, param) => `${param}=${value}`).join('&')}`;
    }

    first (page) {
        return page == 1 ? 1 : null;
    }

    last(page) {
        return page == this.list.pages ? this.list.pages : null;
    }
}
