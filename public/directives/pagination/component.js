System.register(['angular2/core', 'angular2/router', 'underscore', '../../common/classes'], function(exports_1, context_1) {
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
    var core_1, router_1, underscore_1, classes_1;
    var PaginationComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            },
            function (classes_1_1) {
                classes_1 = classes_1_1;
            }],
        execute: function() {
            PaginationComponent = (function () {
                function PaginationComponent(_params) {
                    this._params = _params;
                    this.change = new core_1.EventEmitter();
                    this.pages = [];
                }
                PaginationComponent.prototype.ngOnInit = function () {
                    this.pages = underscore_1.default.range(1, this.list.pages + 1);
                };
                PaginationComponent.prototype.onClick = function (page) {
                    if (page > 0 && page <= this.list.pages) {
                        this.change.emit(page);
                    }
                    return false;
                };
                PaginationComponent.prototype.href = function (page) {
                    return window.location.pathname + "?" + underscore_1.default.map(underscore_1.default.assign(this._params.params, { page: page }), function (value, param) { return (param + "=" + value); }).join('&');
                };
                PaginationComponent.prototype.first = function (page) {
                    return page == 1 ? 1 : null;
                };
                PaginationComponent.prototype.last = function (page) {
                    return page == this.list.pages ? this.list.pages : null;
                };
                __decorate([
                    core_1.Input(), 
                    __metadata('design:type', classes_1.List)
                ], PaginationComponent.prototype, "list", void 0);
                __decorate([
                    core_1.Output(), 
                    __metadata('design:type', Object)
                ], PaginationComponent.prototype, "change", void 0);
                PaginationComponent = __decorate([
                    core_1.Component({
                        selector: 'pagination',
                        templateUrl: './directives/pagination/index.html'
                    }), 
                    __metadata('design:paramtypes', [router_1.RouteParams])
                ], PaginationComponent);
                return PaginationComponent;
            }());
            exports_1("PaginationComponent", PaginationComponent);
        }
    }
});
//# sourceMappingURL=component.js.map