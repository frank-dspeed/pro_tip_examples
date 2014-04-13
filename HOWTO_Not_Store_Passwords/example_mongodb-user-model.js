// Sorry that i don't cleand the syntax will update that sometime.
// THE Required Packages
var mongoose = require('mongoose'), // DB Connector
    crypto = require('crypto'), // Encrypt strings
    uuid = require('node-uuid'), // Generates Uniq User IDS
    Schema = mongoose.Schema, // see below
    ObjectId = Schema.ObjectId; // see below
 

/*
the salt property has default value set 'uuid.v1'
this is a function from package node-uuid to generate a uniq User ID 
Every User instance will thus have a UUID value stored in its salt.
*/
var userSchema = new Schema({
    name: { type: String, required: true, unique: true },
    email: { type: String, required: true },
    salt: { type: String, required: true, default: uuid.v1 },
    passwdHash: { type: String, required: true }
});
 
/* Create Hash from supplyed User Password and salt value (UUID)
IMPORTENT! Here we use SHA-256 to create the hash only for Demonstration!!. 
In Production u will use bcrypt, which is specifically designed to be slow 
so that it makes brute forcing a much more expensive and impractical operation.
hehehhehe :D
*/
var hash = function(passwd, salt) {
    return crypto.createHmac('sha256', salt).update(passwd).digest('hex');
};

// Store value of var hash in DB
userSchema.methods.setPassword = function(passwordString) {
    this.passwdHash = hash(passwordString, this.salt);
};

/* The Auth Method (Hash Validation Method) 
 Uses value of var hash with User Entered Password for auth 
 and Matches it Against the Stored Hash
*/
userSchema.methods.isValidPassword = function(passwordString) {
    return this.passwdHash === hash(passwordString, this.salt);
};
 
mongoose.model('User', userSchema);
module.exports = mongoose.model('User');