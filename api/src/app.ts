import express from 'express';
import mongoose from 'mongoose';
require('dotenv').config()

const app = express();
const port = 3001;
const connectionString: any = process.env.DB_CONNECTION_STRING;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use('/api/service', require('./routes/service'));

mongoose.connect(
  connectionString, // connection string
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log('Unable to connect to Mongo.');
      process.exit(1);
    } else {
      app.listen(port, () => {
        console.log(`Listening on port ${port}...`);
      });

      mongoose.connection.on('error', (err) => {
        console.error(err);
      });
    }
  }
);