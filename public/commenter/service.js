System.register(['angular2/core', 'angular2/http', 'rxjs/Rx', '../common/utilities'], function(exports_1, context_1) {
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
    var core_1, http_1, utilities_1;
    var CommenterService;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (_1) {},
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            }],
        execute: function() {
            CommenterService = (function () {
                function CommenterService(_http, _observable) {
                    this._http = _http;
                    this._observable = _observable;
                    this._uri = 'api/commenter';
                }
                CommenterService.prototype.create = function (commenter) {
                    return this._http.post(this._uri + "/" + commenter._id, JSON.stringify(commenter))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                CommenterService.prototype.retrieve = function (id) {
                    return this._http.get(this._uri + "/" + id)
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                CommenterService.prototype.update = function (commenter) {
                    return this._http.put(this._uri + "/" + commenter._id, JSON.stringify(commenter))
                        .map(this._observable.json)
                        .catch(this._observable.error);
                };
                CommenterService.prototype.delete = function (id) {
                    return this._http.delete(this._uri + "/" + id)
                        .catch(this._observable.error);
                };
                CommenterService = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http, utilities_1.ObservableUtilities])
                ], CommenterService);
                return CommenterService;
            }());
            exports_1("CommenterService", CommenterService);
        }
    }
});
//# sourceMappingURL=service.js.map