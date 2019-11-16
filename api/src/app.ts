import express, {Application, Request, Response, NextFunction, ErrorRequestHandler} from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
require('dotenv').config()

const app: Application = express();
const port: Number  = 3001;
const connectionString: any = process.env.DB_CONNECTION_STRING;

app.use((req: Request, res: Response , next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use(bodyParser.urlencoded({ extended: false })); // parse x-www-form-urlencoded
app.use(bodyParser.json()); // parse JSON
app.use('/api/service', require('./routes/service'));

mongoose.connect(
  connectionString, // connection string
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => 
    {if (err) {
      console.log('Unable to connect to Mongo.', err);
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