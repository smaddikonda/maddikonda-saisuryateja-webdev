(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteListController", websiteListController);

    function websiteListController(WebsiteService, $location, $routeParams) {
        var viewModel = this;
        viewModel.userid = $routeParams['uid'];

        init();

        function init() {
            viewModel.websites = WebsiteService.findWebsitesByUser(viewModel.userid);
        }
    }
})();