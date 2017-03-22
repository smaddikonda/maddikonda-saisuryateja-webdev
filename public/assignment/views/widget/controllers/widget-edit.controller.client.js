(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWidgetController", WidgetEditController)
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

    function WidgetEditController(WidgetService,$sce,$routeParams,$location) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userid = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteid = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageid = pageId;
        var widgetId = $routeParams['wgid'];
        viewModel.widgetId = widgetId;

        //event handlers
        viewModel.getWidgetEditURL =  getWidgetEditURL;
        viewModel.editWidget = editWidget;
        viewModel.deleteWidget = deleteWidget;
        viewModel.createNewWidget = createNewWidget;
        viewModel.flickrSearch = flickrSearch;

        function init() {
            var widgetIdParts = widgetId.split("-");
            if(widgetIdParts[0]=="create"){
                viewModel.widgetType = widgetIdParts[1];
            }
            else {
                var promise = WidgetService.findWidgetById(widgetId);
                promise.then(function successCallback(response) {
                        var widget = response.data;
                        if (widget.widgetType == "IMAGE" || widget.widgetType == "YOUTUBE") {
                            widget.width = getWidthValue(widget.width);
                        }
                        viewModel.widget = widget;
                        viewModel.editWidgetVar = true;
                    },
                    function errorCallback(response) {
                        viewModel.error = "Error while loading Widget";
                    });
            }
        }
        init();

        function flickrSearch() {
            $location.url("/user/"+ viewModel.userid +"/website/"+ viewModel.websiteid + "/page/"+ viewModel.pageid + "/widget/" + viewModel.widgetId + "/search");
        }

        function getWidgetEditURL(widgetType) {
            var url = "views/widget/editors/widget-"+widgetType+"-edit.view.client.html";
            return url;
        }

        function getWidthValue(widthInPercent) {
            var widthVals = widthInPercent.split("%");
            var width = widthVals[0];
            return width;
        }

        function editWidget(widgetDetails) {
            var promise =  WidgetService.updateWidget(widgetDetails._id,widgetDetails);
            promise.then(function successCallback(response) {
                    var widgetDetails = response.data;
                    if(widgetDetails!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    } else {
                        viewModel.error = "Error while updating widget by ID:" + widgetId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while updating widget by ID:" + widgetId;
                });
        }

        function deleteWidget() {
            var promise =  WidgetService.deleteWidget(widgetId);
            promise.then(function successCallback(response) {
                    var deletedWidgetId = response.data;
                    if(deletedWidgetId!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    } else {
                        viewModel.error = "Error while deleting widget by ID:" + widgetId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while deleting widget by ID:" + widgetId;
                });

        }

        function createNewWidget(widgetDetails) {
            widgetDetails.widgetType = viewModel.widgetType;
            var promise =  WidgetService.createWidget(pageId,widgetDetails);
            promise.then(function successCallback(response) {
                    var widgetDetails = response.data;
                    if(widgetDetails!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page/"+pageId+"/widget");
                    } else {
                        viewModel.error = "Error while creating widget";
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while creating widget";
                });
        }
    }
})();