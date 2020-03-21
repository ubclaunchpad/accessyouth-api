import mongoose from 'mongoose';

const AccountSchema = new mongoose.Schema({
  // email: {
  //   type: String,
  //   required: true,
  // },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountType: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
  collection: 'account'
});

module.exports = mongoose.model('Account', AccountSchema);