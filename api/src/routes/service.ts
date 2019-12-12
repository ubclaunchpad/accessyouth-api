import express, { Router, Request, Response, NextFunction } from 'express';
const router: Router = express.Router();

import validator from 'validator';

const Service = require('../models/service');

router.post('/create', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isUUID(req.body.uuid)) {
    res.status(400).send('Invalid UUID');
    return;
  }

  Service.create({
    uuid: req.body.uuid,
    name: req.body.name,
    currentLocation: req.body.currentLocation,
    description: req.body.description,
  }, (err: any, service: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(service);
    }
  });
});

router.get('/getService', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isUUID(req.body.uuid)) {
    res.status(400).send('Invalid UUID');
    return;
  }

  Service.findOne({
    uuid: req.query.uuid
  }, (err: any, service: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(service);
    }
  });
});

router.post('/updateLocation', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isUUID(req.body.uuid)) {
    res.status(400).send('Invalid UUID');
    return;
  } else if (!req.body.currentLocation.lat || !req.body.currentLocation.lon) {
    res.status(400).send('currentLocation must have lat and lon');
    return;
  }

  Service.updateOne({
    uuid: req.body.uuid
  }, {
    $set: { currentLocation: req.body.currentLocation }
  }, (err: any, service: any) => {
    if (err) {
      res.status(500).send({ message: err });
    } else {
      res.status(200).send("Location updated successfully");
    }
  });
});

router.post('/getLocation', (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isUUID(req.body.uuid)) {
    res.status(400).send('Invalid UUID');
    return;
  }

  Service.findOne({
    uuid: req.body.uuid
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

router.get('/getAllServices', (req: Request, res: Response, next: NextFunction) => {
  Service.find({}, (err: any, services: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send(services);
    }
  });
});

router.post('/updateDetails', async (req: Request, res: Response, next: NextFunction) => {
  if (!validator.isUUID(req.body.uuid)) {
    res.status(400).send('Invalid UUID');
    return;
  } else if (!req.body.description) {
    res.status(500).send("Invalid description");
    return;
  }

  Service.updateOne({
    uuid: req.body.uuid
  }, {
    $set: { description: req.body.description }
  }, (err: any, service: any) => {
    if (err) {
      res.status(500).send({message: err});
    } else {
      res.status(200).send("Description updated successfully");
    }
  });
});

module.exports = router;