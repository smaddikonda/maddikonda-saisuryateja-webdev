(function (){
    angular
        .module("WebAppMaker")
        .controller("profileController", profileController);

    function profileController(UserService, $routeParams) {

        var viewModel = this;
        viewModel.userid = $routeParams['uid'];

        viewModel.updateProfile = updateProfile;

        init();

        function init() {
            var user = UserService.findUserById(viewModel.userid);
            viewModel.user = angular.copy(user);
        }

        function updateProfile(user) {
            var updatedUser = UserService.updateUser(viewModel.userid, user);
            if (updatedUser == undefined || updatedUser == null) {
                viewModel.error = "Error occurred while updating profile. Please update again.";
            } else {
                viewModel.success = "Profile updated successfully.";
            }
        }
    }
})();