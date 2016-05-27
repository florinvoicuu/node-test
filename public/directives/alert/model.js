System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var __extends = (this && this.__extends) || function (d, b) {
        for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
    var Alert, Alerts;
    return {
        setters:[],
        execute: function() {
            Alert = (function () {
                function Alert(type, message) {
                    this.type = type;
                    this.message = message;
                }
                return Alert;
            }());
            exports_1("Alert", Alert);
            Alerts = (function (_super) {
                __extends(Alerts, _super);
                function Alerts() {
                    _super.apply(this, arguments);
                }
                return Alerts;
            }(Array));
            exports_1("Alerts", Alerts);
        }
    }
});
//# sourceMappingURL=model.js.map