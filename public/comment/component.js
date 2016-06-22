System.register(['angular2/core', 'angular2/router', 'angular2/http', 'underscore', '../common/utilities', '../directives/alert/component', './service', './model', '../directives/pagination/component', "../commenter/component", '../commenter/service', '../user/component'], function(exports_1, context_1) {
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
    var core_1, router_1, http_1, underscore_1, utilities_1, component_1, service_1, model_1, component_2, component_3, service_2, component_4, component_5;
    var CommentListComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (underscore_1_1) {
                underscore_1 = underscore_1_1;
            },
            function (utilities_1_1) {
                utilities_1 = utilities_1_1;
            },
            function (component_1_1) {
                component_1 = component_1_1;
            },
            function (service_1_1) {
                service_1 = service_1_1;
            },
            function (model_1_1) {
                model_1 = model_1_1;
            },
            function (component_2_1) {
                component_2 = component_2_1;
            },
            function (component_3_1) {
                component_3 = component_3_1;
            },
            function (service_2_1) {
                service_2 = service_2_1;
            },
            function (component_4_1) {
                component_4 = component_4_1;
                component_5 = component_4_1;
            }],
        execute: function() {
            CommentListComponent = (function () {
                function CommentListComponent(_commenter, _user, _comment, _router, _params, _observable) {
                    this._commenter = _commenter;
                    this._user = _user;
                    this._comment = _comment;
                    this._router = _router;
                    this._params = _params;
                    this._observable = _observable;
                    this.user = new component_4.User;
                    this.list = new model_1.CommentList;
                    this.comment = new model_1.Comment;
                    this.BADGE_TYPES = ['fa-coffee', 'fa-diamond', 'fa-database'];
                    this.BADGE_COLORS = ['brown', 'red', 'green'];
                    this._urlSearchParams = new http_1.URLSearchParams;
                }
                CommentListComponent.prototype.update = function () {
                    var _this = this;
                    this._observable.subscribe(this._comment.retrieveRange(this.list), function (list) {
                        var _loop_1 = function(comment) {
                            _this._observable.subscribe(_this._commenter.retrieve(comment.user._id), function (commenter) { return comment.commenter = commenter; });
                        };
                        for (var _i = 0, _a = _this.list.items; _i < _a.length; _i++) {
                            var comment = _a[_i];
                            _loop_1(comment);
                        }
                    });
                };
                CommentListComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    var page = this._params.get("page");
                    if (page) {
                        this.list.page = Number(page);
                    }
                    // check for size in cookie 'comments-per-page'
                    this._observable.subscribe(this._user.retrieve(), function (user) { return _this.user = user; });
                    this.list.params = underscore_1.default.pick({
                        title: this._params.get("title")
                    }, underscore_1.default.identity);
                    this.update();
                };
                CommentListComponent.prototype.submit = function () {
                    var _this = this;
                    this._observable.subscribe(this._comment.create(this.comment), function (comment) {
                        _this.update();
                        _this.comment.content = '';
                        _this._alert.add(new component_1.Alert('success', 'Comment creat!'));
                    });
                };
                CommentListComponent.prototype.size = function (size) {
                    // set cookie 'comments-per-page'
                };
                CommentListComponent.prototype.page = function (page) {
                    this.list.page = page;
                    this._router.navigate(['Comment', underscore_1.default.assign(this._params.params, { page: page })]);
                    this.update();
                };
                CommentListComponent.prototype.search = function () {
                    this.list.page = 1;
                    this._router.navigate(['Comment', underscore_1.default.pick(this.list.params, underscore_1.default.identity)]);
                };
                CommentListComponent.prototype.badge = function (comment, type) {
                    this._observable.subscribe(this._comment.badge(comment._id, type), function (newComment) {
                        comment.badges = newComment.badges;
                    });
                };
                CommentListComponent.prototype.badges = function (comment) {
                    var badges = [0, 0, 0];
                    for (var _i = 0, _a = comment.badges; _i < _a.length; _i++) {
                        var badge = _a[_i];
                        if (underscore_1.default.contains(this.BADGE_TYPES, badge.type)) {
                            badges[underscore_1.default.indexOf(this.BADGE_TYPES, badge.type)]++;
                        }
                    }
                    return badges;
                };
                __decorate([
                    core_1.ViewChild(component_1.AlertComponent), 
                    __metadata('design:type', component_1.AlertComponent)
                ], CommentListComponent.prototype, "_alert", void 0);
                CommentListComponent = __decorate([
                    core_1.Component({
                        selector: 'comments',
                        templateUrl: './comment/index.html',
                        directives: [
                            component_2.PaginationComponent,
                            component_1.AlertComponent,
                            component_3.CommenterComponent,
                            component_5.UserComponent
                        ],
                        providers: [
                            service_1.CommentService,
                            service_2.CommenterService,
                            component_4.UserService
                        ]
                    }), 
                    __metadata('design:paramtypes', [service_2.CommenterService, component_4.UserService, service_1.CommentService, router_1.Router, router_1.RouteParams, utilities_1.ObservableUtilities])
                ], CommentListComponent);
                return CommentListComponent;
            }());
            exports_1("CommentListComponent", CommentListComponent);
        }
    }
});
//# sourceMappingURL=component.js.map