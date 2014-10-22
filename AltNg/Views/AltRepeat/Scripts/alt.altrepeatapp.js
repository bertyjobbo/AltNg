'use strict';
var alt = alt || {};
alt.altcviewapp = angular.module("alt.altrepeatapp", ["ng", "alt.route", "alt.repeat", "alt.ui", "ui.bootstrap"]);
(function (app) {

    app.run(["$rootScope", function ($rootScope) {
        $rootScope.moduleName = "alt.altrepeatapp";
    }]);

    app.controller("homeController", ["$scope", "$timeout", "$q", function ($scope, $timeout, $q) {

        $scope.indexAction = function () {

            // for all repeaters
            var getSomeData = function (limit) {
                var data = [];
                for (var i = 0; i < limit; i++) {
                    data.push({ Id: Math.random(), Name: Math.random() });
                }
                return data;
            }

            // for alt-repeat
            var recurse = function () {

                $scope.data = getSomeData(300);

                $timeout(function () {

                    recurse();

                }, 1000);

            };            

            // for alt-buttload (window)
            $scope.getScrollingData = function () {

                if (!$scope.scrollingData) {
                    $scope.scrollingData = getSomeData(50);
                    return;
                }
                $scope.scrollingData = $scope.scrollingData.concat(getSomeData(50));

            }

            // for alt-buttload (element)
            $scope.getScrollingData2 = function () {
                
                // deferred
                var deferred = $q.defer();
                
                if (!$scope.scrollingData2) {
                    $scope.scrollingData2 = getSomeData(50);
                    deferred.resolve();
                    return;
                }
                else {
                    $scope.scrollingData2 = $scope.scrollingData2.concat(getSomeData(50));
                    deferred.resolve();
                }

                return deferred.promise;
            }

            // GO!!
            $scope.getScrollingData();
            $scope.getScrollingData2();
            recurse();

        }

    }]);

})(alt.altcviewapp);
