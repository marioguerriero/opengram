import config from './../config_test';
import mongoose from 'mongoose';

export default function() {
  mongoose.connect(config.dbhost, { useMongoClient: true });
};
