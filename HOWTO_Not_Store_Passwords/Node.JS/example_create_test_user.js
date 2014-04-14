var user = new User({
    name: 'test_user',
    email: 'blah'
});
user.setPassword('test');
 
user.save(function(err, result) {
    if (err) throw err;
});