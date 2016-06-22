System.register(['../user/model'], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var model_1;
    var Commenter;
    return {
        setters:[
            function (model_1_1) {
                model_1 = model_1_1;
            }],
        execute: function() {
            Commenter = (function () {
                function Commenter() {
                    this._id = '';
                    this.user = new model_1.User;
                    this.name = '';
                    this.description = '';
                    this.image = '';
                    this.badge = '';
                }
                return Commenter;
            }());
            exports_1("Commenter", Commenter);
        }
    }
});
//# sourceMappingURL=model.js.map