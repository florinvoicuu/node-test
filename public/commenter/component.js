System.register(['angular2/core', 'angular2/router', '../directives/alert/component', '../common/utilities', './service', './model'], function(exports_1, context_1) {
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
    var core_1, router_1, component_1, utilities_1, service_1, model_1;
    var CommenterComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            }],
        execute: function() {
            CommenterComponent = (function () {
                function CommenterComponent(_commenter, _router, _params, _observable) {
                    this._commenter = _commenter;
                    this._router = _router;
                    this._params = _params;
                    this._observable = _observable;
                    this.commenter = new model_1.Commenter;
                    this.signup = false;
                    this.COMMENTER_BADGE_TYPE = '';
                }
                CommenterComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var id = this._params.get('id');
                    if (id) {
                        this._observable.subscribe(this._commenter.retrieve(id), function (commenter) { return _this.commenter = commenter; });
                    }
                    else {
                        this.signup = true;
                    }
                };
                CommenterComponent.prototype.create = function () {
                    var _this = this;
                    this._observable.subscribe(this._commenter.create(this.commenter), function (user) {
                        _this._alert.add(new component_1.Alert('success', 'Esti un Commenter!'));
                        _this._router.navigate(['User', { action: 'commenter' }]);
                    });
                };
                CommenterComponent.prototype.update = function () {
                    var _this = this;
                    this._observable.subscribe(this._commenter.update(this.commenter), function (user) {
                        _this._alert.add(new component_1.Alert('success', 'Modificat cu succes!'));
                        _this._router.navigate(['User', { action: 'commenter' }]);
                    });
                };
                CommenterComponent.prototype.submit = function () {
                    this.signup ? this.create() : this.update();
                };
                __decorate([
                    core_1.ViewChild(component_1.AlertComponent), 
                    __metadata('design:type', component_1.AlertComponent)
                ], CommenterComponent.prototype, "_alert", void 0);
                CommenterComponent = __decorate([
                    core_1.Component({
                        selector: 'commenter',
                        templateUrl: './commenter/index.html',
                        directives: [component_1.AlertComponent],
                        providers: [
                            service_1.CommenterService
                        ]
                    }), 
                    __metadata('design:paramtypes', [service_1.CommenterService, router_1.Router, router_1.RouteParams, utilities_1.ObservableUtilities])
                ], CommenterComponent);
                return CommenterComponent;
            }());
            exports_1("CommenterComponent", CommenterComponent);
            exports_1("CommenterService", service_1.CommenterService);
            exports_1("Commenter", model_1.Commenter);
        }
    }
});
//# sourceMappingURL=component.js.map