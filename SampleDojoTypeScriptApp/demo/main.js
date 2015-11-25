define(["require", "exports", "./demoWidget/widget", "dojo/dom-construct", "dojo/_base/window"], function (require, exports, DemoWidget, domConstruct, win) {
    var AppController = (function () {
        function AppController() {
        }
        AppController.prototype.start = function () {
            var widget = new DemoWidget();
            domConstruct.place(widget.domNode, win.body());
            widget.startMap();
        };
        return AppController;
    })();
    return AppController;
});
//# sourceMappingURL=main.js.map