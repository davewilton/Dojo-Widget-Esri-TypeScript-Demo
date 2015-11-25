define(["require", "exports", "./demoWidget/widget", "dojo/dom-construct"], function (require, exports, DemoWidget, domConstruct) {
    var AppController = (function () {
        function AppController() {
        }
        AppController.prototype.start = function () {
            var widget = new DemoWidget();
            domConstruct.place(widget.domNode, "widgetDiv");
            widget.startMap();
        };
        return AppController;
    })();
    return AppController;
});
//# sourceMappingURL=main.js.map