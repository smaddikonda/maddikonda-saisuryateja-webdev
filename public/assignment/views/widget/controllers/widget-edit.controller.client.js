(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetEditController", widgetEditController)
        .directive('stringToNumber', function() {
            return {
                require: 'ngModel',
                link: function(scope, element, attrs, ngModel) {
                    ngModel.$parsers.push(function(value) {
                        return '' + value;
                    });
                    ngModel.$formatters.push(function(value) {
                        return parseFloat(value);
                    });
                }
            };
        });

    function widgetEditController(WidgetService, $routeParams, $location) {
        var viewModel = this;

        viewModel.userid = $routeParams['uid'];
        viewModel.websiteid = $routeParams['wid'];
        viewModel.pageid = $routeParams['pid'];
        viewModel.widgetid = $routeParams['wgid'];

        viewModel.getWidgetEditURL =  getWidgetEditURL;
        viewModel.editWidget = editWidget;
        viewModel.deleteWidget = deleteWidget;
        viewModel.createNewWidget = createNewWidget;

        init();

        function init() {
            var widgetidParts = viewModel.widgetid.split("-");
            if(widgetidParts[0]=="create"){
                viewModel.widgetType = widgetidParts[1];
            }
            else {
                var widget = WidgetService.findWidgetById(viewModel.widgetid);
                if (widget.widgetType == "IMAGE" || widget.widgetType == "YOUTUBE") {
                    widget.width = getWidthValue(widget.width);
                }
                viewModel.widget = widget;
                viewModel.editWidgetVar = true;
            }
        }

        function getWidgetEditURL(widgetType) {
            var url = "views/widget/editors/widget-"+ widgetType + "-edit.view.client.html";
            return url;
        }

        function getWidthValue(widthInPercent) {
            var widthVals = widthInPercent.split("%");
            var width = widthVals[0];
            return width;
        }

        function editWidget(widgetDetails) {
            var widgetDetails = WidgetService.updateWidget(widgetDetails._id,widgetDetails);
            if(widgetDetails!= undefined) {
                viewModel.successMessage = "Widget updated successfully";
            } else {
                viewModel.errorMessage = "Error while updating widget by ID:" + widgetid;
            }
            $location.url("/user/"+ viewModel.userid + "/website/" + viewModel.websiteid + "/page/" + viewModel.pageid + "/widget");
        }

        function deleteWidget() {
            var deletedWidgetId = WidgetService.deleteWidget(viewModel.widgetid);
            if(deletedWidgetId!= undefined) {
                viewModel.successMessage = "Widget deleted successfully";
            } else {
                viewModel.errorMessage = "Error while deleting widget by ID:" + widgetid;
            }
            $location.url("/user/" + viewModel.userid + "/website/" + viewModel.websiteid + "/page/" + viewModel.pageid + "/widget");
        }

        function createNewWidget(widgetDetails) {
            widgetDetails.widgetType = viewModel.widgetType;
            var widgetDetails = WidgetService.createWidget(viewModel.pageid, widgetDetails);
            if (widgetDetails != undefined) {
                viewModel.successMessage = "Widget created successfully";
            } else {
                viewModel.errorMessage = "Error while creating widget";
            }
            $location.url("/user/" + viewModel.userid + "/website/" + viewModel.websiteid + "/page/" + viewModel.pageid + "/widget");
        }
    }
})();