import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currentLocation: {
    lat: {
      type: Number,
      required: true,
    },
    lon: {
      type: Number,
      required: true,
    }
  },
  description: {
    type: String
  }
}, {
  timestamps: true,
  collection: 'service'
});

module.exports = mongoose.model('Service', ServiceSchema);