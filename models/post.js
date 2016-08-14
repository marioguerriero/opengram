var mongoose = require('mongoose');
var gsf = require('./gfs'); /*  This is not directly used but it is imported
                              so that the models it contains are declared */
var User = require('./user');

var Schema = mongoose.Schema;

// Define and export User's schema and model
var post_schema = new Schema({
  publisher: { type: Schema.Types.ObjectId, ref: 'User' },
  media: { type: Schema.Types.ObjectId, ref: 'File' },
  message: String,
  date: { type: Date, default: Date.now },
  mentions: [ { type: Schema.Types.ObjectId, ref: 'User' } ],
  tags: [ String ]
}, { versionKey: false });

module.exports = Post = mongoose.model('Post', post_schema);
