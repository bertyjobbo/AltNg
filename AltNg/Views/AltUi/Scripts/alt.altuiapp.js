'use strict';

var alt = alt || {};

alt.altuiapp = angular.module("alt.altuiapp", ["ng", "alt.route","alt.ui"]);

(function(app) {
    app.run(["$rootScope", function ($rootScope) {
        $rootScope.moduleName = "alt.altuiapp";
    }]);
})(alt.altuiapp);