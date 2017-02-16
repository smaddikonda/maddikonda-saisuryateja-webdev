(function () {
    angular
        .module("WebAppMaker")
        .controller("widgetNewController", widgetNewController);

    function widgetNewController(WidgetService, $routeParams) {
        var viewModel = this;
        viewModel.userid = $routeParams['uid'];
        viewModel.websiteid = $routeParams['wid'];
        viewModel.pageid = $routeParams['pid'];

        init();

        function init() {
            viewModel.allWidgetTypes = WidgetService.findAllWidgets(viewModel.pageid);
        }
    }
})();