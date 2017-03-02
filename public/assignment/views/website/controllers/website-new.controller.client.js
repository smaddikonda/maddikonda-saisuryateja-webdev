(function () {
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController(WebsiteService,$routeParams,$location) {
        var viewModel = this;
        var userId = $routeParams['uid'];
        viewModel.userid = userId;

        //event handlers
        viewModel.createWebsite = createWebsite;

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
        }
        init();

        function createWebsite(newWebsiteDetails) {
            var promise = WebsiteService.createWebsite(userId, newWebsiteDetails);
            promise.then(function successCallback(response) {
                    user = response.data;
                    if(user) {
                        $location.url("/user/"+userId+"/website");
                    } else {
                        viewModel.error = "Website not created";
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Website not created";
                });
        }

    }
})();