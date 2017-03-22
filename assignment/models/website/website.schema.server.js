module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
            _user: String,
            password: String,
            firstName: String,
            lastName: String,
            email: String,
            phone: String,
            websites: [Number],
            dateCreated: Date
        },
        {collection: 'assignment.user'});

    return UserSchema;
};