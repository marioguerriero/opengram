import mongoose from 'mongoose';

var Schema = mongoose.Schema;

var File = mongoose.model('File', new Schema({}, {strict: false}), 'fs.files');
var Chunk = mongoose.model('Chunk', new Schema({}, {strict: false}), 'fs.chunks');

export {File};
export {File as Chunk};
