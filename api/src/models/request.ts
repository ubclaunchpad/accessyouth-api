import mongoose from 'mongoose';

const RequestSchema = new mongoose.Schema({
  location: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    }
  },
  phone: {
    type: String,
    required: true,
  },
  details: {
    type: String
  },
  status: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  collection: 'request'
});

module.exports = mongoose.model('Request', RequestSchema);