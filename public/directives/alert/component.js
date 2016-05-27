System.register(['angular2/core', './model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, model_1;
    var AlertComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            }],
        execute: function() {
            AlertComponent = (function () {
                function AlertComponent(alerts) {
                    this.alerts = alerts;
                }
                AlertComponent.prototype.add = function (alert) {
                    this.alerts.push(alert);
                };
                AlertComponent.prototype.remove = function (index) {
                    this.alerts.splice(index, 1);
                };
                AlertComponent.prototype.clear = function () {
                    this.alerts.length = 0;
                };
                AlertComponent = __decorate([
                    core_1.Component({
                        selector: 'alerts',
                        templateUrl: './directives/alert/index.html'
                    }), 
                    __metadata('design:paramtypes', [model_1.Alerts])
                ], AlertComponent);
                return AlertComponent;
            }());
            exports_1("AlertComponent", AlertComponent);
            exports_1("Alert", model_1.Alert);
            exports_1("Alerts", model_1.Alerts);
        }
    }
});
//# sourceMappingURL=component.js.map