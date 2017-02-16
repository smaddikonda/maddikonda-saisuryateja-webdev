(function () {
    angular
        .module("WebAppMaker")
        .controller("loginController", loginController);
    
    function loginController(UserService, $location) {
        var viewModel = this;
        viewModel.login = login;

        function login (user) {
            var loginUser = UserService.findUserByCredentials(user.username, user.password);
            if(loginUser != null) {
                $location.url('/user/' + loginUser._id);
            } else {
                viewModel.error = 'user not found';
            }
        }
    }
})();