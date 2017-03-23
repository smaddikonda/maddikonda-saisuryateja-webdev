(function () {
    angular
        .module("WebAppMaker")
        .controller("WidgetNewController", WidgetNewController);

    function WidgetNewController(WidgetService,$sce,$routeParams) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userid = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteid = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageid = pageId;

        function init() {
            var promise =  WidgetService.findAllWidgets(pageId);
            promise.then(function successCallback(response) {
                    var allWidgetTypes = response.data;
                    if(allWidgetTypes!= undefined) {
                        viewModel.allWidgetTypes = allWidgetTypes;
                    } else {
                        viewModel.error = "Error while loading Widget Types";
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while loading Widget Types";
                });

        }
        init();

    }
})();