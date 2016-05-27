System.register(['angular2/core', 'angular2/http', 'rxjs/Observable', '../directives/alert/component'], function(exports_1, context_1) {
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
    var core_1, http_1, Observable_1, component_1;
    var ObservableUtilities;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            }],
        execute: function() {
            ObservableUtilities = (function () {
                function ObservableUtilities(_alert) {
                    this._alert = _alert;
                }
                ObservableUtilities.prototype.subscribe = function (observable, callback) {
                    var _this = this;
                    if (callback === void 0) { callback = (function () { }); }
                    return observable.subscribe(callback, function (err) {
                        _this._alert.clear();
                        _this._alert.add(new component_1.Alert('danger', err));
                    });
                };
                ObservableUtilities.prototype.json = function (res) {
                    var body = res.json();
                    return body || {};
                };
                ObservableUtilities.prototype.error = function (res) {
                    var error;
                    if (!(res instanceof http_1.Response)) {
                        error = JSON.stringify(res);
                    }
                    else if (res.status >= 300) {
                        error = 'Unexpected result.';
                        if (res.status == 404) {
                            error = res.text() || 'Resource not found';
                        }
                        else if (res.status == 400) {
                            error = res.text() || 'Request could not be processed.';
                        }
                        else if (res.status == 401) {
                            error = res.text() || 'Not authorized.';
                        }
                        else if (res.status == 403) {
                            error = "You're not allowed to be here. Contact support for more information.";
                        }
                        else if (res.status == 500) {
                            error = 'There was a problem with the server; try again later or contact support if the issue persists.';
                        }
                    }
                    return Observable_1.Observable.throw(error);
                };
                ObservableUtilities = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [component_1.AlertComponent])
                ], ObservableUtilities);
                return ObservableUtilities;
            }());
            exports_1("ObservableUtilities", ObservableUtilities);
        }
    }
});
//# sourceMappingURL=utilities.js.map