import mongoose from 'mongoose';
import { Guid } from "guid-typescript";

const LogSchema = new mongoose.Schema({
  logId: {
    type: String, 
    default: Guid.create().toString(), 
    required: true 
  },
  deviceType: {
    type: String,
    required: true,
  },
  deviceVersion: {
    type: String,
    required: true
  },
  appVersion: {
    type: String,
    required: true,
  },
  event: {
      type: String, 
      required: true
  }, 
  additionalInfo: {
    type: Object
  }
}, {
  timestamps: true,
  collection: 'logs'
});

module.exports = mongoose.model('Logs', LogSchema);