(function () {
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController(WebsiteService,$routeParams,$location) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userid = userId;
        var websiteId = $routeParams['wid'];
        viewModel.websiteId = websiteId;

        //event handlers
        viewModel.updateWebsite = updateWebsite;
        viewModel.deleteWebsite = deleteWebsite;

        function init() {
            var promise = WebsiteService.findWebsitesByUser(userId);
            promise.then(function successCallback(response) {
                    var websites = response.data;
                    if(websites!= undefined) {
                        viewModel.websites = websites;
                    } else {
                        viewModel.error = "Error while loading websites for user ID:" + userId;
                    }

                },
                function errorCallback(response) {
                    viewModel.error = "Error while loading websites for user ID:" + userId;
                });


            var promiseCurrentWebsite = WebsiteService.findWebsiteById(websiteId);
            promiseCurrentWebsite.then(function successCallback(response) {
                    var currentWebsite = response.data;
                    if(currentWebsite!= undefined) {
                        viewModel.currentWebsite = currentWebsite; //current website to edit
                    } else {
                        viewModel.error = "Error while loading website";
                    }

                },
                function errorCallback(response) {
                    viewModel.error = "Error while loading website";
                });
        }
        init();

        function updateWebsite(websiteDetails) {
            var promise = WebsiteService.updateWebsite(websiteId,websiteDetails);
            promise.then(function successCallback(response) {
                    var websiteDetails = response.data;
                    if(websiteDetails!= undefined) {
                        $location.url("/user/"+userId+"/website");
                    } else {
                        viewModel.error = "Error while updating website by ID:" + websiteId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while updating website by ID:" + websiteId;
                });

        }

        function deleteWebsite() {
            var promise = WebsiteService.deleteWebsite(websiteId);
            promise.then(function successCallback(response) {
                    var deleteWebsiteId = response.data;
                    if(deleteWebsiteId!= undefined) {
                        $location.url("/user/"+userId+"/website");
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