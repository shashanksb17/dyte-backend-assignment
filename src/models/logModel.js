const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  level: String,
  message: String,
  resourceId: { type: String, unique: true },
  timestamp: Date,
  traceId: { type: String, unique: true },
  spanId: { type: String, unique: true },
  commit: { type: String, unique: true },
  metadata: {
    parentResourceId: String,
  }
});

logSchema.index({ level: 'text', message: 'text' });
const Log = mongoose.model('Log', logSchema);

module.exports = Log;
