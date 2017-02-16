(function (){
    angular
        .module("WebAppMaker")
        .controller("pageEditController", pageEditController);

    function pageEditController(PageService, $routeParams, $location) {
        var viewModel = this;

        viewModel.userid = $routeParams['uid'];
        viewModel.websiteid = $routeParams['wid'];
        viewModel.pageid = $routeParams['pid'];

        viewModel.updatePage = updatePage;
        viewModel.deletePage = deletePage;

        //Call the constructor init() to initialize the values of pages developed by the current user,
        // and the page id of the current page being edited.
        init();

        function init() {
            var pages = PageService.findPageByWebsiteById(viewModel.websiteid);
            viewModel.pages = angular.copy(pages);
            var currentPage = PageService.findPageById(viewModel.pageid);
            viewModel.currentPage = angular.copy(currentPage);
        }

        function updatePage(page) {
            var updatedPage = PageService.updatePage(viewModel.pageid, page);
            if(updatedPage != undefined || updatedPage != null) {
                viewModel.success = "Page: " + updatedPage.name + " updated successfully.";
                viewModel.pages = angular.copy(PageService.findPageByWebsiteById(viewModel.websiteid));
                $location.url('/user/' + viewModel.userid + '/website/' + viewModel.websiteid + '/page');
            } else {
                viewModel.error = "Failed to update. Please retry."
            }
        }

        function deletePage(page) {
            PageService.deletePage(page._id);
            var deletedPage = PageService.findPageById(page._id);
            if (deletedPage == undefined || deletedPage == null) {
                viewModel.success = "Page: " + page.name + " deleted successfully.";
                viewModel.pages = angular.copy(PageService.findPageByWebsiteById(viewModel.websiteid));
                $location.url('/user/' + viewModel.userid + '/website/' + viewModel.websiteid + '/page');
            } else {
                viewModel.error = "Page deletion failed. Please retry."
            }
        }
    }
})();