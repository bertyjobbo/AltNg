var alt = alt || {

};
alt.utils = {
    guid: function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    uniqueId: function () {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};
alt.ui = angular.module("alt.ui", ["ng","ui.bootstrap"]);
(function (app) {

    // navbar toggle
    app.directive("navbarToggle", [function () {
        return {
            restrict: "C",
            link: function (scope, element, attrs) {

                // find hidden
                var hiddenEl = element.parent().next();

                // bind click
                element.bind("click", function (e) {

                    // prevent nav
                    e.preventDefault();

                    // apply class to hidden
                    if (hiddenEl.hasClass("in")) {
                        hiddenEl.removeClass("in");
                    } else {
                        hiddenEl.addClass("in");
                    }
                });

                // find clicks
                var clicks = hiddenEl.find("a");
                angular.forEach(clicks, function (c) {
                    var clickEl = angular.element(c);
                    if (!clickEl.hasClass("dropdown-toggle")) {
                        clickEl.bind("click", function () {
                            if (hiddenEl.hasClass("in"))
                                element.triggerHandler("click");
                        });
                    }
                });

                angular.element(document).bind("click", function (e) {
                    if (!element[0].contains(e.target) && !hiddenEl[0].contains(e.target)){
                        if (hiddenEl.hasClass("in"))
                            element.triggerHandler("click");
                    }
                });
            }
        }

    }]);



})(alt.ui);