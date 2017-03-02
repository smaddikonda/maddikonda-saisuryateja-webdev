(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController(PageService,$routeParams,$location) {

        //Route Params
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userid = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteid = websiteId;
        var pageId = $routeParams['pid'];
        viewModel.pageId = pageId;

        //Event Handlers
        viewModel.updatePage = updatePage;
        viewModel.deletePage = deletePage;


        function init() {
            var promise = PageService.findPageByWebsiteId(websiteId);
            promise.then(function successCallback(response) {
                    var pages = response.data;
                    if(pages!= undefined) {
                        viewModel.pages = pages;
                    } else {
                        viewModel.error = "Error while loading pages for website ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while loading pages for website ID:" + websiteId;
                });

            var promiseCurrentPage = PageService.findPageById(pageId);
            promiseCurrentPage.then(function successCallback(response) {
                    var currentPage = response.data;
                    if(currentPage!= undefined) {
                        viewModel.currentPage = currentPage;
                    } else {
                        viewModel.error = "Error while loading pages for website ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while loading pages for website ID:" + websiteId;
                });
        }
        init();


        function updatePage(pageDetails) {
            var promise = PageService.updatePage(pageId,pageDetails);
            promise.then(function successCallback(response) {
                    var pageDetails = response.data;
                    if(pageDetails!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                    } else {
                        viewModel.error = "Error while updating page by ID:" + pageId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while updating page by ID:" + pageId;
                });
        }

        function deletePage() {
            var promise = PageService.deletePage(pageId);
            promise.then(function successCallback(response) {
                    var deletedPageId = response.data;
                    if(deletedPageId!= undefined) {
                        $location.url("/user/"+userId+"/website/"+websiteId+"/page");
                    } else {
                        viewModel.error = "Error while deleting website by ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while deleting website by ID:" + websiteId;
                });
        }
    }
})();