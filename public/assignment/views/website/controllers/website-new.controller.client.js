(function () {
    angular
        .module("WebAppMaker")
        .controller("websiteNewController", websiteNewController);

    function websiteNewController(WebsiteService, $routeParams, $location) {
        var viewModel = this;
        viewModel.userid = $routeParams['uid'];

        viewModel.createWebsite = createWebsite;

        init();

        function init() {
            viewModel.websites = WebsiteService.findWebsitesByUser(viewModel.userid);
        }
        
        function createWebsite(website) {
            var newWebsite = WebsiteService.createWebsite(viewModel.userid, website);
            if(newWebsite != null) {
                viewModel.success = "New website: " + newWebsite.name + " created successfully.";
                viewModel.websites = WebsiteService.findWebsitesByUser(viewModel.userid);
                $location.url('/user/' + viewModel.userid + '/website');
            } else {
                viewModel.error = "Error occurred while creating new website. Please retry.";
            }
        }
    }
})();