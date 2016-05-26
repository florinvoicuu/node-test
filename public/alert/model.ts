export class Alert {
    type: string;
    message: string;

    constructor(type, message) {
        this.type = type;
        this.message = message;
    }
}

export class Alerts extends Array<Alert> {}