var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var File = mongoose.model('File', new Schema({}, {strict: false}), 'fs.files');
var Chunk = mongoose.model('Chunk', new Schema({}, {strict: false}), 'fs.chunks');

module.exports.File = File;
module.exports.Chunk = File;
