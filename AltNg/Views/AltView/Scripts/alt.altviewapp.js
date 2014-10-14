'use strict';
var alt = alt || {};
alt.altviewapp = angular.module("alt.altviewapp", ["ng", "alt.route", "alt.ui", "ui.bootstrap"]);

(function(app) {

    app.run(["$rootScope", function($rootScope) {
        
        $rootScope.moduleName = "alt.altviewapp";

        $rootScope.$on("$routeChangeStart", function (e, startData) {
            console.log("$routeChangeStart from app  ", startData);
        });

        $rootScope.$on("$routeChangeSuccess", function (e, endData) {
            console.log("$routeChangeSuccess from app  ", endData);
        });

        $rootScope.$on("$routeChangeError", function (e, endData) {
            console.log("$routeChangeError from app  ", endData);
            alert("Page Not Found");
        });

    }]);

    app.controller("homeController", ["$scope", function($scope) {
        
        $scope.indexAction = function(a, b, c, d, e, f, g, h, i, j, k, l, m) {
            //console.log("a: ", a);
            //console.log("b: ", b);
            //console.log("c: ", c);
            //console.log("d: ", d);
            //console.log("e: ", e);
        };

        


    }]);

})(alt.altviewapp);