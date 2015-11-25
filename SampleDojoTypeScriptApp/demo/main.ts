import DemoWidget = require("./demoWidget/widget");
import domConstruct = require("dojo/dom-construct");

export = AppController;

class AppController {

    start() {
        var widget = new DemoWidget();
        domConstruct.place(widget.domNode, "widgetDiv");
        widget.startMap();
    }
}
 

