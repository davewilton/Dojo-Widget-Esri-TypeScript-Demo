var path = location.origin + '/' + location.pathname.split('/')[1];
window.path = path;

require({
    packages: [{
        name: "demo",
        location: window.path + "/demo"
    }
    //,
    //{
    //    name: "dijit",
    //    location: window.path + "/arcgis-js-api/dijit"
    //},
    //{
    //    name: "esri",
    //    location: window.path + "/arcgis-js-api/esri"
    //},
    //{
    //    name: "xstyle",
    //    location: window.path + "/arcgis-js-api/xstyle"
    //}
    ]
});

//https://github.com/DefinitelyTyped/DefinitelyTyped/tree/master/dojo
require(["dojo/dom", "dojo/text", "dojo/i18n"],
    function (dom, text, i18n) {

        //set dojo/text and dojo/i18n to static resources to allow to be loaded via
        //require() call inside of module and load cached version
        text.dynamic = false;
        i18n.dynamic = false;
        require(["demo", "dojo/domReady!"], function (demo) {
            var app = new demo();
            app.start();
        });

    });

