(function () {
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController(UserService, $routeParams) {
        var viewModel = this;

        //event handlers
        viewModel.updateProfile = updateProfile;

        init();

        function init() {
            var userId = $routeParams['uid'];
            viewModel.userid = userId;
            var promise = UserService.findUserById(userId);
            promise.then(
                function (user) {
                    user = user.data;
                    if(user!= undefined) {
                        viewModel.user = user;
                    } else {
                        viewModel.error = "Error while loading user by ID:" + userId;
                    }
                }
            );
        }

        function updateProfile(user) {
            var userId = $routeParams['uid'];
            var promise = UserService.updateUser(userId,user);
            promise.then(
                function successCallback(response) {
                    if(response.status == 200) {
                        viewModel.success = "Profile updated successfully";
                    } else {
                        viewModel.error = "Error while updating user by ID:" + userId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error= "Error while updating user by ID:" + userId;
                });
        }

        /*
        function deleteUser() {
            var userId = $routeParams['uid'];
            var promise = UserService.updateUser(userId,user);
            promise.then(
                function successCallback(response) {
                    if(response.status == 200) {
                        viewModel.success = "Profile updated successfully";
                    } else {
                        viewModel.error = "Error while updating user by ID:" + userId;
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "Error while updating user by ID:" + userId;
                });
        }
        */
    }
})();