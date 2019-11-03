import express from 'express';
const router = express.Router();

const Service = require('../models/service');

router.post('/create', (req, res) => {
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

router.get('/getService', (req, res) => {
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

router.post('/updateLocation', (req, res) => {
  // TODO: validate req
  Service.updateOne({
    uuid: req.body.uuid
  }, {
    currentLocation: req.body.currentLocation
  }, (err: any) => {
    if (err) {
      res.status(500).send('Internal Error');
    } else {
      res.status(200).send();
    }
  });
});

router.get('/getLocation', (req, res) => {
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

module.exports = router;