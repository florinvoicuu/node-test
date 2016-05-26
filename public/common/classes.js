// Common:
System.register([], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var List;
    return {
        setters:[],
        execute: function() {
            List = (function () {
                function List() {
                    this.items = [];
                    this.total = 0;
                    this.pages = 0;
                    this.size = 10;
                    this.page = 1;
                    this.params = {};
                }
                return List;
            }());
            exports_1("List", List);
        }
    }
});
// Abstract:  
//# sourceMappingURL=classes.js.map