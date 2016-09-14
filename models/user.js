var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var Schema = mongoose.Schema;

// Define and export User's schema and model
var user_schema = new Schema({
  name: String,
  username: String,
  password: String,
  avatar: { type: Schema.Types.ObjectId, ref: 'File' },
  birthday: Date,
  following: [ { type: Schema.Types.ObjectId, ref: 'User' } ]
}, {versionKey: false});

// Hash user's password
user_schema.pre('save', function(next) {
  var user = this;

  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if(err) return next(err);
      // Override clear text password with the hashed one
      user.password = hash;
      next();
    });
  });
});

module.exports = mongoose.model('User', user_schema);;
