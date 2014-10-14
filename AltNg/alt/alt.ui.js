var alt = alt || {
    
};
alt.utils = {
    guid: function() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    },
    uniqueId: function() {
        return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
};
alt.ui = angular.module("alt.ui", ["ng"]);
(function(app) {
    
	// NAVBAR DIRECTIVE
    app.directive("altUiToggle", [function() {


    	// fields
        var _dropDowns, _buttons, _dropDownCollection, _buttonCollection;

    	// methods
		var setStuff = function(col1, col2, className, getOtherElMethod) {
		    
			// add to collection
			angular.forEach(col1, function (el) {

				var id = alt.utils.uniqueId();
				var objToPush = {
					isOpen: false,
					id: id
				};

				// dd
				objToPush.originalElement = el;
				objToPush.angularElement = angular.element(objToPush.originalElement);
			    objToPush.parentAngularElement = getOtherElMethod(objToPush.angularElement);

				// push
				col2[id] = objToPush;

			});

			// loop collection
			angular.forEach(col2, function (ddObj, theId) {

				// bind
				ddObj.angularElement.bind("click", function (e) {

					e.preventDefault();

				    if (ddObj.isOpen) {
						ddObj.isOpen = false;
						ddObj.parentAngularElement.removeClass(className);
					} else {
						ddObj.isOpen = true;
						ddObj.parentAngularElement.addClass(className);
					}

				});

			});

		}
        var setDropDowns = function() {

            _dropDownCollection = {};
            setStuff(_dropDowns, _dropDownCollection, "open", function (el) { return el.parent(); });

		}
		var setButtons = function() {

		    _buttonCollection = {};
		    setStuff(_buttons, _buttonCollection, "in", function(el) { return el.parent().next(); });

		}

        return {
            
        	restrict: "AEC",
			link:function(scope, element, attrs) {
			    
				// el
			    var el = element[0];

				// find toggles
			    _dropDowns = el.querySelectorAll(".dropdown-toggle");
			    _buttons = el.querySelectorAll(".navbar-toggle");
			    


				// go
			    setDropDowns();
			    setButtons();


			}
        	
        };

    }]);
	
})(alt.ui);