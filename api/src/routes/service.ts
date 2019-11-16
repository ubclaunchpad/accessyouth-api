import express, {Router,Request,Response} from 'express';
const router: Router = express.Router();

const Service = require('../models/service');

router.post('/create', (req: Request, res: Response) => {
  // TODO: validate req
  Service.create({
    uuid: req.body.uuid,
    name: req.body.name,
    currentLocation: req.body.currentLocation,
    description: req.body.description,
  }, (err: any, doc: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(doc);
    }
  });
});

router.get('/getService', (req: Request, res: Response) => {
  // TODO: validate req
  Service.findOne({
    uuid: req.query.uuid
  }, (err: any, doc: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(doc);
    }
  });
});

router.post('/updateLocation', (req: Request, res: Response) => {
  // TODO: validate req
  if (!req.body.currentLocation){
    res.status(400).send("No location to update")
  } else if (req.body.currentLocation.includes(null)){
    res.status(400).send("Cannot send null location")
  } else if (!req.body.currentLocation.lat || !req.body.currentLocation.lon){
    res.status(400).send("Location must have a lat and lon")
  } else {
    Service.updateOne({
      uuid: req.body.uuid
    }, {
      $set: {currentLocation: req.body.currentLocation}
    }, {runValidators: true}, (err: any, doc: any) => {
      if (err) {
        res.status(500).send({message: err});
      } else {
        res.status(200).send("Location updated successfully");
      }
    });
  }
});

router.get('/getLocation', (req: Request, res: Response) => {
  Service.findOne({
    uuid: req.query.uuid
  }, (err: any, service: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else if (!service) {
      res.status(404).send('Service not found');
    } else {
      res.status(200).send(service.currentLocation);
    }
  });
});

router.post('/updateDetails', async (req: Request, res: Response) => {

  // TODO: validate req
  Service.updateOne({
    uuid: req.body.uuid
  }, {
    $set: {description: req.body.description}
  }, {runValidators: true}, (err: any,doc: any) => {
    if (err) {
      res.status(500).send({message: err});
    } else {
      res.status(200).send("Description updated successfully");
    }
  });
});

module.exports = router;