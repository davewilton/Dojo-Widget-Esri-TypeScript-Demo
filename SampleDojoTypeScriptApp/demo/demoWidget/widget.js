/// <reference path="../../typings/arcgis-js-api.d.ts" />
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
define(["require", "exports", "dojo/_base/declare", "dijit/_WidgetBase", "dijit/_TemplatedMixin", "dijit/_WidgetsInTemplateMixin", "./Map/MapController", "dojo/text!demo/demoWidget/demoWidget.html", "xstyle/css!./css/demoWidget.css", "dojo/i18n!./nls/strings"], function (require, exports, dojoDeclare, _WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin, MapController) {
    var template = require("dojo/text!demo/demoWidget/demoWidget.html");
    var nls = require("dojo/i18n!./nls/strings");
    var css = require('xstyle/css!./css/demoWidget.css');
    var DemoWidget = (function (_super) {
        __extends(DemoWidget, _super);
        function DemoWidget(args, elem) {
            return new Foo_(args, elem);
            _super.call(this);
        }
        DemoWidget.prototype.postCreate = function () {
            this.textInfo.set('value', nls.description);
        };
        DemoWidget.prototype.startMap = function () {
            this._mapController = new MapController('mapDiv');
            this._mapController.start();
        };
        return DemoWidget;
    })(dijit._WidgetBase);
    //extra stuff needed to make typescript work with dojo widget
    var Foo_ = dojoDeclare("", [_WidgetBase, _TemplatedMixin, _WidgetsInTemplateMixin], (function (Source) {
        var result = {};
        result.templateString = template;
        result.nls = nls;
        result.constructor = function () {
            this.myArray = [];
        };
        for (var i in Source.prototype) {
            if (i !== "constructor" && Source.prototype.hasOwnProperty(i)) {
                result[i] = Source.prototype[i];
            }
        }
        return result;
    }(DemoWidget)));
    return DemoWidget;
});
//extra stuff needed to make the app work 
//# sourceMappingURL=widget.js.map