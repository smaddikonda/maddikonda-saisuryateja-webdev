(function () {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    function RegisterController(UserService,$location) {
        var viewModel = this;

        //event handlers
        viewModel.register = register;

        function register(user) {
            var promise = UserService.createUser(user);
            promise.then(function successCallback(response) {
                    user = response.data;
                    if(user) {
                        $location.url("/user/"+user._id);
                    } else {
                        viewModel.error = "User not created";
                    }
                },
                function errorCallback(response) {
                    viewModel.error = "User not created";
                });
        }
    }
})();