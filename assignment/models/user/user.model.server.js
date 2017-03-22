module.exports = function () {

    var mongooseQ = require('q');
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser,
        setModel: setModel
    };

    var mongoose = require('mongoose');

    var UserSchema = require('./user.schema.server')();
    var UserModel = mongoose.model('UserModel', UserSchema);
    var model = null;

    return api;

    function createUser(user) {
        var deferred = mongooseQ.defer();
        UserModel.create(user, function (err, usr) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(usr);
            }
        });
        return deferred.promise;
    };

    function findUserById(userId){
        var deferred = mongooseQ.defer();
        UserModel.findById(userId ,function (err,usr){
            if(err){
                deferred.reject(err);
            } else {
                deferred.resolve(usr);
            }
        });
        return deferred.promise;
    }

    function findUserByUsername(userName) {
        var deferred = mongooseQ.defer();
        UserModel.find({username:userName}, function (err, usr) {
            if(err) {
                deferred.reject(err);
            } else{
                deferred.resolve(usr);
            }
        });
        return deferred.promise;
    }
    
    function findUserByCredentials(userName, passWord) {
        var deferred = mongooseQ.defer();
        UserModel.find({username:userName, password:passWord} , function (err,usr) {
            if(err){
                deferred.reject(err);
            }
            else{
                deferred.resolve(usr);
            }
        });
        return deferred.promise;
    }
    
    function updateUser(userId, newUser) {
        var deferred = mongooseQ.defer();
        UserModel
            .update(
                {_id: userId}, {$set : newUser}, function(err, usr) {
                    if(err){
                        deffered.reject(err);
                    }
                    else{
                        return usr;
                    }
                });
        return deferred.promise;
    }


};