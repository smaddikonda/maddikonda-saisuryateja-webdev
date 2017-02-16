(function (){
    angular
        .module("WebAppMaker")
        .controller("registerController", registerController);

    function registerController(UserService, $location) {

        var viewModel = this;

        viewModel.register = register;

        function register(user) {
            if(user.repassword == user.password) {
                var newUser = UserService.createUser(user);
                $location.url('/user/' + newUser._id);
            } else {
                viewModel.error = "Re-entered password does not match. Please check."
            }
        }
    }
})();