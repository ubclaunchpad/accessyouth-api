import mongoose from 'mongoose';

const ServiceSchema = new mongoose.Schema({
  uuid: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  currentLocation: {
    type: [Number],
    required: true,
  },
  description: {
    type: String
  }
}, {
  collection: 'service'
});

module.exports = mongoose.model('Service', ServiceSchema);