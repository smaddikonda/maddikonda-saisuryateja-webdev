(function () {
    angular
        .module("WebAppMaker")
        .controller("pageNewController", pageNewController);

    function pageNewController(PageService, $routeParams, $location) {
        var viewModel = this;
        viewModel.userid = $routeParams['uid'];
        viewModel.websiteid = $routeParams['wid'];

        init();

        function init() {
            viewModel.pages = PageService.findPageByWebsiteById(viewModel.websiteid);
        }

        viewModel.createPage = createPage;
        
        function createPage(page) {
            var newPage = PageService.createPage(viewModel.websiteid, page);
            if(newPage != null) {
                viewModel.success = "New page: " + newPage.name + " created successfully.";
                viewModel.pages = PageService.findPageByWebsiteById(viewModel.websiteid);
                $location.url('/user/' + viewModel.userid + '/website/' + viewModel.websiteid + '/page');
            } else {
                viewModel.error = "Error occurred while creating new website. Please retry.";
            }
        }
    }
})();