(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);

    function UserService() {

        var users = [
            {_id: "123", username: "alice",    password: "alice",    email: "alice@geemail.com",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      email: "bob@geemail.com",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   email: "charly@hurray.com",    firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", email: "jannunzi@lookout.com", firstName: "Jose",   lastName: "Annunzi" }
        ];

        var api = {
            "createUser" : createUser,
            "findUserById" : findUserById,
            "findUserByUsername" : findUserbyUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser" : updateUser,
            "deleteUser" : deleteUser
        };
        return api;

        function createUser(user) {
            var newUser = {
                "_id": Math.floor(Date.now() / 1000),
                "username": user.username,
                "password": user.password,
                "email": "",
                "firstName": "",
                "lastName": ""
            };
            users.push(newUser);
            return newUser;
        }

        function findUserById(userid) {
            for(var u in users) {
                var user = users[u];
                if (user._id == userid) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserbyUsername(username) {
            for(var u in users){
                var user = user[u];
                if(user.username == username) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for(var u in users) {
                var user = users[u];
                if(user.username == username && user.password == password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userid, updatedUser) {
            for(var u in users) {
                var user = users[u];
                if( user._id == userid) {
                    user.username = updatedUser.username;
                    user.password = updatedUser.password;
                    user.email = updatedUser.email;
                    user.firstName = updatedUser.firstName;
                    user.lastName = updatedUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userid) {
            for (var u in users) {
                var user = users[u];
                if (user._id == userid) {
                    users.splice(u, 1);
                }
            }
        }

    }
})();