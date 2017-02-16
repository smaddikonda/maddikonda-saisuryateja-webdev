(function () {
    angular
        .module("WebAppMaker")
        .controller("pageListController", pageListController);

    function pageListController(PageService, $location, $routeParams) {
        var viewModel = this;
        viewModel.userid = $routeParams['uid'];
        viewModel.websiteid = $routeParams['wid'];

        init();

        function init() {
            viewModel.pages = PageService.findPageByWebsiteById(viewModel.websiteid);
        }
    }
})();