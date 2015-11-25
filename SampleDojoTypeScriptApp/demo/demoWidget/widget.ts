/// <reference path="../../typings/arcgis-js-api.d.ts" />

/// <amd-dependency path="dojo/text!demo/demoWidget/demoWidget.html" />
/// <amd-dependency path="xstyle/css!./css/demoWidget.css" />
/// <amd-dependency path="dojo/i18n!./nls/strings" />

declare var require: (moduleId: string) => any;

import dojoDeclare = require("dojo/_base/declare");
import _WidgetBase = require("dijit/_WidgetBase");
import _TemplatedMixin = require("dijit/_TemplatedMixin");
import _WidgetsInTemplateMixin = require("dijit/_WidgetsInTemplateMixin");


import MapController = require("./Map/MapController");
import DojoTextBox = require("dijit/form/TextBox");

var template: string = require("dojo/text!demo/demoWidget/demoWidget.html");
var nls = require("dojo/i18n!./nls/strings");
var css = require('xstyle/css!./css/demoWidget.css');

class DemoWidget extends dijit._WidgetBase {

    constructor(args?: Object, elem?: HTMLElement) {
        return new Foo_(args, elem);
        super();
    }

    nls: any;
     
    myArray: string[];
    private _mapController: MapController;

    //dojo data attach points in the form
    textInfo: dijit.form.TextBox;

    postCreate(): void {
       this.textInfo.set('value', nls.description);
    }

    startMap(): void {
        this._mapController = new MapController('mapDiv');
        this._mapController.start();
    }
}


//extra stuff needed to make typescript work with dojo widget

var Foo_ = dojoDeclare("", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], (function (Source: any) {
    var result: any = {};
    result.templateString = template;
    result.nls = nls;
    result.constructor = function () {
        this.myArray = [];
    }
    for (var i in Source.prototype) {
        if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
            result[i] = Source.prototype[i];
        }
    }
    return result;
} (DemoWidget)));

export =DemoWidget;

//extra stuff needed to make the app work