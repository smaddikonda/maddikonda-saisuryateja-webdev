(function () {
    angular
        .module("WebAppMaker")
        .factory("UserService", userService);

    function userService($http) {
        var api = {
            "findUserByCredentials": findUserByCredentials,
            "findUserById": findUserById,
            "updateUser": updateUser,
            "findUserByUsername": findUserByUsername,
            "createUser": createUser,
            "deleteUser": deleteUser,
            "login" : login
        };
        return api;

        function login(user) {
            return $http.post("/api/login", user);
        }

        function createUser(newUser) {
            return $http.post("/api/user", newUser);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username="+username);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/"+userId, newUser);
        }

        function findUserById(userId) {
            return $http.get("/api/user/"+userId);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username="+username+"&password="+password);
        }

        function deleteUser(username, password) {
            return $http.delete("/api/user/"+userId);
        }
    }
})();