var authenticate = function(username, password, callback) {
    User.findOne({ name: username }, function(err, user) {
        if (err) return callback(new Error('User not found'));
        if (user.isValidPassword(password)) return callback(null, user);
        return callback(new Error('Invalid password'));
    });
};