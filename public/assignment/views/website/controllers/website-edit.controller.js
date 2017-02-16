(function (){
    angular
        .module("WebAppMaker")
        .controller("websiteEditController", websiteEditController);

    function websiteEditController(WebsiteService, $routeParams, $location) {
        var viewModel = this;

        viewModel.userid = $routeParams['uid'];
        viewModel.websiteid = $routeParams['wid'];

        viewModel.updateWebsite = updateWebsite;
        viewModel.deleteWebsite = deleteWebsite;

        //Call the constructor init() to initialize the values of websites developed by the current user,
        // and the website id of the current website being edited.
        init();

        function init() {
            var websites = WebsiteService.findWebsitesByUser(viewModel.userid);
            viewModel.websites = angular.copy(websites);
            var currentWebsite = WebsiteService.findWebsiteById(viewModel.websiteid);
            viewModel.currentWebsite = angular.copy(currentWebsite);
        }

        function updateWebsite(website) {
            var updatedWebsite = WebsiteService.updateWebsite(viewModel.websiteid, website);
            if(updatedWebsite != undefined || updatedWebsite != null) {
                viewModel.success = "Website: " + updatedWebsite.name + " updated successfully.";
                viewModel.websites = WebsiteService.findWebsitesByUser(viewModel.userid);
                $location.url('/user/' + viewModel.userid + '/website');
            } else {
                viewModel.error = "Failed to update. Please retry."
            }
        }

        function deleteWebsite(website) {
            WebsiteService.deleteWebsite(website._id);
            var deletedWebsite = WebsiteService.findWebsiteById(website._id);
            if (deletedWebsite == undefined || deletedWebsite == null) {
                viewModel.success = "Website: " + website.name + " deleted successfully.";
                viewModel.websites = WebsiteService.findWebsitesByUser(viewModel.userid);
                $location.url('/user/' + viewModel.userid + '/website');
            } else {
                viewModel.error = "Website deletion failed. Please retry."
            }
        }
    }
})();