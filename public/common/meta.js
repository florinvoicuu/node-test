System.register(['angular2/core', 'angular2/platform/browser', 'angular2/src/platform/dom/dom_adapter'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    };
    var __metadata = (this && this.__metadata) || function (k, v) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
    };
    var core_1, browser_1, dom_adapter_1;
    var Meta, SEO, OpenGraph;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (dom_adapter_1_1) {
                dom_adapter_1 = dom_adapter_1_1;
            }],
        execute: function() {
            Meta = (function () {
                function Meta() {
                    this.head = dom_adapter_1.DOM.query('head');
                }
                Meta.prototype.getMeta = function (meta) {
                    return this[meta].getAttribute('content');
                };
                Meta.prototype.setMeta = function (meta, value) {
                    this[meta].setAttribute('content', value);
                };
                Meta.prototype.meta = function (name) {
                    var meta;
                    meta = dom_adapter_1.DOM.query("meta[" + this.attribute + "=" + name + "]");
                    if (meta === null) {
                        meta = dom_adapter_1.DOM.createElement('meta');
                        meta.setAttribute(this.attribute, name);
                        this.head.appendChild(meta);
                    }
                    return meta;
                };
                return Meta;
            }());
            SEO = (function (_super) {
                __extends(SEO, _super);
                function SEO(title) {
                    _super.call(this);
                    this.title = title;
                    this.description = this.meta('description');
                    this.robots = this.meta('robots');
                }
                Object.defineProperty(SEO.prototype, "attribute", {
                    get: function () {
                        return 'name';
                    },
                    enumerable: true,
                    configurable: true
                });
                SEO = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [browser_1.Title])
                ], SEO);
                return SEO;
            }(Meta));
            exports_1("SEO", SEO);
            OpenGraph = (function (_super) {
                __extends(OpenGraph, _super);
                function OpenGraph() {
                    _super.call(this);
                    this.url = this.meta('og:url');
                    this.type = this.meta('og:type');
                    this.title = this.meta('og:title');
                    this.description = this.meta('og:description');
                    this.image = this.meta('og:image');
                }
                Object.defineProperty(OpenGraph.prototype, "attribute", {
                    get: function () {
                        return 'property';
                    },
                    enumerable: true,
                    configurable: true
                });
                OpenGraph = __decorate([
                    core_1.Injectable(), 
                    __metadata('design:paramtypes', [])
                ], OpenGraph);
                return OpenGraph;
            }(Meta));
            exports_1("OpenGraph", OpenGraph);
        }
    }
});
//# sourceMappingURL=meta.js.map