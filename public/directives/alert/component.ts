import { Component } from 'angular2/core';

import { Alert, Alerts } from './model';

@Component({
    selector: 'alerts',
    templateUrl: './directives/alert/index.html'
})
export class AlertComponent {
    constructor(public alerts: Alerts) {}

    add(alert: Alert) {
        this.alerts.push(alert);
    }

    remove(index: number) {
        this.alerts.splice(index, 1);
    }

    clear() {
        this.alerts.length = 0;
    }
}

export { Alert, Alerts };
