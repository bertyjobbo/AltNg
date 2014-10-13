'use strict';

var alt = alt || {};
alt.route = angular.module("alt.route", ["ng"]);

(function (app) {

    // controller checker
    //http://stackoverflow.com/questions/19734565/how-to-check-if-an-angularjs-controller-has-been-defined
    app.service('altControllerChecker', ['$controller', function ($controller) {
        return {
            exists: function (controllerName) {
                if (typeof window[controllerName] == 'function') {
                    return true;
                }
                try {
                    $controller(controllerName);
                    return true;
                } catch (error) {
                    return !(error instanceof TypeError);
                }
            }
        };
    }]);

    // view directive
    app.directive("altView", ["$location", "$controller", "$compile", "$rootScope", "$http", "altControllerChecker", function ($location, $controller, $compile, $rootScope, $http, altControllerChecker) {

        return {

            restrict: "A",

            link: function (scope, element, attrs) {

                // remove attr
                element.removeAttr("data-alt-view");
                element.removeAttr("alt-view");

                // get expression
                var urlExpression = attrs.altView;

                // cache
                var viewCache = {};

                // check no hash
                if ($location.$$path == "") {
                    $location.path("/");
                }

                // now watch
                scope.$watch(function () { return $location.$$path; }, function (newPath) {

                    // emit
                    scope.$broadcast("$routeChangeStart", newPath);

                });

                // events
                scope.$on("$routeChangeStart", function (e, newPath) {

                    // lower
                    newPath = newPath.toLowerCase();

                    // split
                    var splt = newPath === "/" ? ["home", "index"] : (newPath === "/home" || newPath === "/home/") ? ["home", "index"] : newPath.substr(1).split("/");

                    // check
                    if (splt[splt.length - 1] === "") splt.splice(splt.length - 1, 1);

                    // check
                    if (splt.length === 1) splt[1] = "index";

                    // check
                    if (splt.length === 0) $location.path("/");

                    // set 
                    $location.$$route = {};
                    $location.$$route.$$routeController = splt[0] + "Controller";
                    $location.$$route.$$routeControllerName = splt[0];
                    $location.$$route.$$routeAction = splt[1] + "Action";
                    $location.$$route.$$routeActionName = splt[1];
                    $location.$$route.$$routeParams = [];

                    // check
                    if (splt.length > 2) {
                        for (var i = 2; i < splt.length; i++) {
                            $location.$$route.$$routeParams.push(splt[i]);
                        }
                    }


                    // check if controller exists
                    var ctrlExist = altControllerChecker.exists($location.$$route.$$routeController);

                    // if it does, add the attribute
                    if (ctrlExist) {
                        element.attr("data-ng-controller", $location.$$route.$$routeController);
                        var initMarkup = $location.$$route.$$routeAction + "(";
                        for (var i2 = 0; i2 < $location.$$route.$$routeParams.length; i2++) {

                            initMarkup +=
                                "'" +
                                $location.$$route.$$routeParams[i2] +
                                "'";

                            if (i2 < ($location.$$route.$$routeParams.length - 1)) {
                                initMarkup += ", ";
                            }
                        }
                        initMarkup += ");";
                        element.attr("data-ng-init", initMarkup);
                    } else {
                        element.removeAttr("data-ng-controller");
                        element.removeAttr("ng-controller");
                    }

                    // get url
                    //var url = altRouteConfig.viewUrlMethod(splt[0], splt[1], $location.$$route.$$routeParams).toLowerCase();

                    // get url
                    var replacedUrlExpression =
                        urlExpression
                            .replace(/(\$controller)/g, "'" + $location.$$route.$$routeControllerName + "'")
                            .replace(/(\$action)/g, "'" + $location.$$route.$$routeActionName + "'");
                    var url = scope.$eval(replacedUrlExpression);

                    // view exists
                    if (viewCache[url]) {

                        // set html
                        element.html(viewCache[url]);

                        // compile
                        $compile(element)(scope);

                        // end event
                        scope.$broadcast("$routeChangeSuccess", $location.$$route);

                    } else {
                        $http
                            .get(url)
                            .success(function (d) {

                                // add to cache
                                viewCache[url] = d;

                                // set html
                                element.html(d);

                                // compile
                                $compile(element)(scope);

                                // end event
                                scope.$broadcast("$routeChangeSuccess", $location.$$route);
                            })
                            .error(function () {
                                // end event
                                scope.$broadcast("$routeChangeError", $location.$$route);
                            });
                    }


                });

            }
        }

    }]);


})(alt.route);