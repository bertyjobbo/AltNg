'use strict';
var alt = alt || {};
alt.altcviewapp = angular.module("alt.altcviewapp", ["ng", "alt.croute"]);
(function(app) {

    app.config(["altCRouteConfigProvider", function(altCRouteConfigProvider) {

        altCRouteConfigProvider
            .mapRoute("Default",
				"{controller}/{action}",
				new { controller: "home", action: "index" },
				function (c, a) { return "AltCView/NgView?c=" + c + "&a=" + a; })
            .mapRoute("Alternative",
				"Alternative/{controller}/{action}",
				new { controller: "home", action: "index" },
				function (c, a) { return "AltCView/NgView?c=" + c + "&a=" + a; });

    }]);

})(alt.altcviewapp);
