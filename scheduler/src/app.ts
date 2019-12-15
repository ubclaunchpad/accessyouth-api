import mongoose from 'mongoose';
require('dotenv').config()

// import jobs
const expireRequestsJob = require('./jobs/expireRequests');

const connectionString: any = process.env.DB_CONNECTION_STRING;

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true }).then(
  () => {
    mongoose.connection.on('error', (err) => {
      console.error(err);
    });
    
    // start jobs
    expireRequestsJob.start();
  },
  (err) => {
    console.log('Unable to connect to Mongo.', err);
    process.exit(1);
  }
).catch((err) => {
  console.error(err);
});