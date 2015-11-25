import DemoWidget = require("./demoWidget/widget");
import domConstruct = require("dojo/dom-construct");
import win = require("dojo/_base/window");
import DojoTextBox = require("dijit/form/TextBox");


export = AppController;

class AppController {

    start() {
        var widget = new DemoWidget();
        domConstruct.place(widget.domNode, win.body());
        widget.startMap();
    }
}
 

